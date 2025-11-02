import { createClient } from 'redis';

const client = createClient({
     username: 'default',
     password: '2RtBxCrQNsjBVaIGvq7lDFWmpuvdb8VL',
     socket: {
          host: 'redis-15237.c99.us-east-1-4.ec2.redns.redis-cloud.com',
          port: 15237
     }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

