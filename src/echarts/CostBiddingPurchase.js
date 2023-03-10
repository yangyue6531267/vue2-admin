


export default function (pieData, colors = ['#316BD8', '#F1AF77','rgba(49, 216, 196, 1)', '#DADADA']) {
    const minAngle = 60;
  return {
        tooltip: {
          show: false,
          trigger: 'item',
        },
        legend: {
          show: false,
        },
        color: colors,
        series: [
          {
            name: '',
            type: 'pie',
            minAngle: minAngle,
            radius: ['30%', '50%'],
            center: 'center',
            avoidLabelOverlap: false,
            itemStyle: { opacity: 0 },
            label: {
              normal: {
                position: 'inside',
                opacity: 1,
                show: true,
                width: 0,
                height: 0,
                padding: 3,
                borderRadius: 3,
                backgroundColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.48)',
                borderWidth: 2,
                distanceToLabelLine: -3,
              },
            },
            labelLine: {
              length: 0,
              length2: 0,
              minSurfaceAngle: 90,
            },
            data: pieData
          },
          {
            name: '',
            type: 'pie',
            minAngle: minAngle,
            radius: ['35%', '50%'],
            center: 'center',
            avoidLabelOverlap: false,
            itemStyle: { opacity: 0 },
            label: {
              opacity: 1,
              show: true,
              alignTo: 'edge',
              edgeDistance: 20,
              margin: 0,
              formatter: (params)=>{
                let data = params.data?.product?params.data.product+'单':''
                return `{hr|}{dark|${params.name}} {val|${params.data.value}} {dark|万元}  ${data} \n {dark|占比}{rate|${params.data.proportion}}{dark|%}`
              },

              lineHeight: 30,
              rich: {
                dark: {
                  color: '#000',
                  fontSize: '0.26rem'
                },
                val: {
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '0.37rem',
                },
                rate: {
                  fontSize: '0.37rem',
                  fontWeight: 'bold',
                  color: '#000',
                },
              },
            },
            labelLine: {
              length: 20,
              length2: 140,
              minSurfaceAngle: 90,
            },
            data: pieData
          },
          {
            type: 'pie',
            minAngle: minAngle,
            radius: ['35%', '50%'],
            center: 'center',
            data: pieData,
            label: {
              show: false,
            },
          },
          
        ],
    };
}
