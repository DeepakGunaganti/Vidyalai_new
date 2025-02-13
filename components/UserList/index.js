import React, { Component, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import useUseFetch from './UseFetch';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',

  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },

  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  '.sort-icon': {
    verticalAlign: 'middle',
    marginLeft: '5px',
  },
}));

const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

const UserList = () =>{
  const [users] = useUseFetch();
  console.log(users)
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName]= useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [sortColumn, setSortColumn] = useState(columnFields[0].value);
  const [sortDirection, setSortDirection] = useState('asc')
 
  useEffect(()=>{
    const fetchData = async () => {
      try {
      
        setFilteredUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
   }, [])
   console.log('Fetched users:', users);
  useEffect(()=> {
    let filteredUser = users?.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()) && user.email.toLowerCase().includes(searchEmail.toLowerCase()))
   if(sortColumn){
     filteredUser?.sort((a,b)=>{
      const x = a[sortColumn];
      const y = b[sortColumn];
      if (x < y) return sortDirection === 'asc' ? -1 : 1;
      if (x > y) return sortDirection === 'asc' ? 1 : -1;
      return 0;
     })
   }
   setFilteredUsers(filteredUser)
  },[searchName, searchEmail, users, sortColumn, sortDirection])
  console.log(searchName)

  const handleOnSearch = useCallback((event)=>{
    const { name, value } = event.target;
    if (name === 'name') {
      setSearchName(value);
    } else if (name === 'email') {
      setSearchEmail(value)
    } else {
      throw new Error('Unknown search element');
    }
  },[])

  const handleSort = useCallback((column)=> {
    if(sortColumn === column){
      setSortDirection(prev => (prev === 'asc' ? 'desc': 'asc'))
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  },[sortColumn])


  return (
   <div>
      <Table>
        <thead>
          <tr>
            {columnFields.map(field => {
              return (
                <th key={field.value}>
                  <div
                    onClick={() => handleSort(field.value)}
                    style={{ paddingBottom: 8 }}
                  >
                    {field.label}
                    {sortColumn === field.value &&
                      (sortDirection === 'asc' ? (
                        <span className={'sort-icon'}>▲</span>
                      ) : (
                        <span className={'sort-icon'}>▼</span>
                      ))}
                  </div>

                  {field.enableSearch ? (
                    <input
                      type={'text'}
                      placeholder={`Search by ${field.label}`}
                      name={field.value}
                      onChange={handleOnSearch}
                      style={{ padding: 6, width: 200 }}
                    />
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ?filteredUsers.map(user => (
            <tr key={user.id}>
              {columnFields.map(field => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          )):users.map(user => (
            <tr key={user.id}>
              {columnFields.map(field => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div></div>
    </div>
  );
};
export default UserList;



