import axios from "axios";
import { User } from "./models/User";

// axios.post('http://localhost:3000/users', {
// 	name: 'Aakash',
// 	age: 23
// });

//axios.get('http://localhost:3000/users')
//.then(( users ) => {
//	console.log(users.data);
//})
//.catch(( error ) => {
//	console.log(error);
//});

const user = new User({ name: 'Aakash', age: 22 });

