import { useState, useEffect } from "react";
import axios from "axios";
// Reusable components //
import { CardList, CardListHeaderBar, CardItem } from "./components";
import "./App.scss";
import { User } from "./models";
import { orderItemsAscendingStr, orderItemsAscendingNum } from "./utils/utils";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);
  const INITIAL_SORT_STATE = "name";
  const [sortValue, setSortValue] = useState(INITIAL_SORT_STATE);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=15")
      .then(({ data: { results } }) => {
        /* Saving the response from the api in two different states
        to later be able to do the filtering using the search filter 
        text without losing the original data */
        setUsersData(results.map((user) => User.fromJson(user)));
        setUsers(
          orderItemsAscendingStr(
            results.map((user) => User.fromJson(user)),
            INITIAL_SORT_STATE
          )
        );
      });
  }, []);

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
    const filteredUsers = usersData.filter(
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
    const users =
      e.target.value === "phone"
        ? orderItemsAscendingNum(usersData, e.target.value)
        : orderItemsAscendingStr(usersData, e.target.value);
    setUsers(users);
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
