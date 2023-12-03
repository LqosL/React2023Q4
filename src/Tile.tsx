import {UserInfo} from "./types/UserInfo";

export default function Tile(userInfo: UserInfo) {
    const name = userInfo.name;
    const age= userInfo.age;
    const email = userInfo.email;
    const password1 = userInfo.password1;
    const password2 = userInfo.password2;
    const gender = userInfo.gender;
    const acceptTerms = userInfo.acceptTerms;
    const image = userInfo.image;
    const country = userInfo.country;


    return <div className={'userTile'}>
        <div> Image: ${image}</div>

        <div> Name: ${name}</div>
        <div> Age: ${age}</div>
        <div> Email: ${email}</div>
        <div> Gender: ${gender}</div>
        <div> Country: ${country}</div>
    </div>
}