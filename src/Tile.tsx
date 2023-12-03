import { UserInfoImaged } from './types/UserInfoImaged';

export default function Tile(userInfo: UserInfoImaged) {
  const name = userInfo.name;
  const age = userInfo.age;
  const email = userInfo.email;
  // const password1 = userInfo.password1;
  // const password2 = userInfo.password2;
  const gender = userInfo.gender;
  // const acceptTerms = userInfo.acceptTerms;
  const image = userInfo.image;
  const country = userInfo.country;

  return (
    <div className={'user-tile'}>
      <img src={image} width={128} height={128} />

      <div> Name: {name}</div>
      <div> Age: {age}</div>
      <div> Email: {email}</div>
      <div> Gender: {gender}</div>
      <div> Country: {country}</div>
    </div>
  );
}
