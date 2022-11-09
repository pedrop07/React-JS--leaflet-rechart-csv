import {
    BarChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
  
import { data } from '../data';

function Chart() {
    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width="100%" height={750} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Nenhum filho" fill="#8884d8" />
                <Bar dataKey="1 filhos" fill="#82c6ca" />
                <Bar dataKey="2 filhos" fill="#82ca9d" />
                <Bar dataKey="mais de 2 filhos" fill="#b7ca82" />
              </BarChart>
            </ResponsiveContainer>
        </>
    );
}
  
export default Chart;
