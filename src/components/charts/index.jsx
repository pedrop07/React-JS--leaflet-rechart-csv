import {
    BarChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
  

function Chart({ dataChart }) {
    var data = [
        {
            "Distancia(m)": 0,
            "Duração(minutos)": 0
        }
    ]

    if(dataChart != ""){
        const { routes } = dataChart;
        
        data = routes.map((route) => {
            let {distance, duration} = route;
            distance = (distance*1.6).toFixed(2);
                return(
                    {
                        "Distancia(m)": `${distance}`,
                        "Duração(minutos)": `${duration}`
                    }
                )
            })
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
                <Bar dataKey="Distancia(m)" fill="#212121" />
                <Bar dataKey="Duração(minutos)" fill="#F4A460" />
              </BarChart>
            </ResponsiveContainer>
        </>
    );
}
  
export default Chart;
