import React,{useState} from "react";
import { encrypt,decrypt,compare } from "n-krypta";

const Practice = () => {
    const [encryptedData, setEncryptedData] = useState('');

    const secret = 'fasdfsd'
  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 35 },
    { name: 'Charlie', age: 40 },
  ];

  const encryptedArray = encrypt(data, secret); //blacardkillerOrboges#,#Appletkiller,killerCbnanbs#,killerGraqeskiller-#Peass#,killerPinfappmfskiller,#Wbtermemons#-killerMaogpeskiller],killerPinfappmfskiller,#Wbtermemons#-killerMaogpeskiller]

  console.log(encryptedArray,typeof(encryptedArray)); // This prints out the encrypted array as string
  
  const decryptedArray = decrypt(encryptedArray, secret); // decrypts the string
  
  console.log(decryptedArray); // This prints out the decrypted array
}

export default Practice;