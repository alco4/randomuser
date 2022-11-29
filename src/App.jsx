import { useState, useEffect, useMemo } from "react";
import axios from "axios";
// Reusable components //
import { CardList, CardListHeaderBar, CardItem } from "./components";
import "./App.scss";
import { User } from "./models";
import { orderItemsAscendingStr } from "./utils/utils";

function App() {
  const usersBackup = useMemo(() => [], []);
  const [users, setUsers] = useState([]);
  const INITIAL_SORT_STATE = "name";
  const [sortValue, setSortValue] = useState(INITIAL_SORT_STATE);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=15")
      .then(({ data: { results } }) => {
        const formattedData = orderItemsAscendingStr(
          results.map((user) => User.fromJson(user)),
          INITIAL_SORT_STATE
        );
        setUsers(formattedData);

        /* Saving a backup of the API response to later be able
           to do the filtering using the search filter
           without losing the original data */
        usersBackup.push(...formattedData);
      });
  }, [usersBackup]);

  // Setting the different handlers that will control the events //
  const handleOnChange = (e, id, propName) => {
    const editedUsers = users.map((user) => {
      if (user.id === id) {
        user[propName] = e.target.value;
      }
      return user;
    });
    setUsers(editedUsers);
  };

  const handleOnFilter = (e) => {
    const filteredUsers = usersBackup.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value) ||
        user.email.toLowerCase().includes(e.target.value) ||
        user.phone.toLowerCase().includes(e.target.value) ||
        user.location.toLowerCase().includes(e.target.value)
    );
    setUsers(filteredUsers);
  };

  const handleOnSort = (e) => {
    setSortValue(e.target.value);
    const sortedUsers = orderItemsAscendingStr(users, e.target.value);
    setUsers(sortedUsers);
  };

  return (
    <div className="App">
      <CardListHeaderBar
        onFilter={handleOnFilter}
        onSort={handleOnSort}
        sortValue={sortValue}
      />
      <CardList>
        {users.map((user, i) => (
          <CardItem
            key={user?.id + i}
            cardData={user}
            onChange={handleOnChange}
          />
        ))}
      </CardList>
    </div>
  );
}

export default App;
