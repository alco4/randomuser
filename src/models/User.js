class User {
  constructor(id, name, email, phone, location, picture) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.picture = picture;
  }

  /**By modeling the data in this way, we avoid a problem in the future,
    since if the response of the api changes some value,
    we would only have to change the property in one place.*/
  static fromJson({ id, name, email, phone, location, picture }) {
    const fomattedId = id.value;
    const fomattedName = `${name.first} ${name.last}`;
    const formattedLocation = `${location.city}, ${location.country}`;
    const formattedPicture = picture.thumbnail;
    return new User(
      fomattedId,
      fomattedName,
      email,
      phone,
      formattedLocation,
      formattedPicture
    );
  }
}

export default User;
