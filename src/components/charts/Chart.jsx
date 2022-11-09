import {
    BarChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
  

function Chart({ info }) {

    let data = [
        {
            "distancia": 20,
            "duração": 10,
            "N de rotas": 2
        }
    ]

    if(info != ""){
        data = [
            {
                "distancia": `${info.routes[0].distance} km`,
                "duração": `${info.routes[0].duration} horas`,
                "N de rotas": `${info.routes.length}`
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
                <Bar dataKey="distancia" fill="#8884d8" />
                <Bar dataKey="duração" fill="#82ca9d" />
                <Bar dataKey="N de rotas" fill="#b7ca82" />
              </BarChart>
            </ResponsiveContainer>
            {/* {info} */}
        </>
    );
}
  
export default Chart;
