import bcrpty from 'bcrypt'

export const hashPassword = async(password) =>{
    try{
      const saltRounds =10;
      const hashedPassword = await bcrpty.hash(password, saltRounds)
      return hashedPassword;
    }catch(error){
      console.log(error)
    }
}

export const comparePassword = async (password , hashedPassword) =>{
  return bcrpty.compare(password , hashedPassword)
}