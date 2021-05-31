import {createPool} from 'promise-mysql';
import keys from './keys';

export async function connect(){
    const connection = createPool(keys.database);
    return connection;
}
