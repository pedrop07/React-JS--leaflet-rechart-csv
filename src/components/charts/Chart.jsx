import {
    BarChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart, 
    Line
} from 'recharts';
  

function Chart({ info }) {

    let data = [
        {
            "Distancia(km)": 20.52,
            "Duração(horas)": 10.22
        }
    ]

    if(info != ""){
        data = [
            {
                "Distancia(km)": `${info.routes[0].distance}`,
                "Duração(horas)": `${info.routes[0].duration}`
            }
        ]
    }

    
    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width="100%" height={750} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Distancia(km)" fill="#212121" />
                <Bar dataKey="Duração(horas)" fill="#F4A460" />
              </BarChart>
            </ResponsiveContainer>
        </>
    );
}
  
export default Chart;
