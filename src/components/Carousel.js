import Card from "./Card"
import Carousel from 'react-bootstrap/Carousel';

const carouselIndex = () => {

    const cities = [
        [
            {
                country: 'Germany',
                city: 'Garmisch Partenkirchen',
                src: './assets/cities/garmischpartenkirchen.png',
                id: '01',
            },
            {
                country: 'Japón',
                city: 'Kyoto',
                src: './assets/cities/kyoto.png',
                id: '02',
            },
            {
                country: 'Iceland',
                city: 'Reykjavik',
                src: './assets/cities/reykjavik.png',
                id: '03',
            },
            {
                country: 'Finland',
                city: 'Saariselkä',
                src: './assets/cities/saariselka.png',
                id: '03',
            },
        ],
        [
            {
                country: 'Germany',
                city: 'Bavaria',
                src: './assets/cities/bavaria.png',
                id: '05',
            },
            {
                country: 'United States',
                city: 'Washington',
                src: './assets/cities/washington.png',
                id: '06',
            },
            {
                country: 'Switzerland',
                city: 'Randa',
                src: './assets/cities/randa.png',
                id: '07',
            },
            {
                country: 'Canadá',
                city: 'Roberta',
                src: './assets/cities/roberta.png',
                id: '08',
            },
        ],
        [
            {
                country: 'Canadá',
                city: 'Yukon',
                src: './assets/cities/yukon.png',
                id: '09',
            },
            {
                country: 'Croatia',
                city: 'Velebit',
                src: './assets/cities/velebit.png',
                id: '010',
            },
            {
                country: 'Russia',
                city: 'Teriberka',
                src: './assets/cities/teriberka.png',
                id: '011',
            },
            {
                country: 'Italy',
                city: 'Belluno',
                src: './assets/cities/belluno.png',
                id: '012',
            },
        ]
    ] 


    return (  
    <div className='d-flex justify-content-center align-items-center size_carousel'>
        <Carousel className='p-1' variant='dark' >
            {cities.map( (arraycities, index) => {
                return ( 
                    <Carousel.Item key={index}>
                        <div className='d-flex justify-content-center flex-wrap'>
                            {
                                arraycities.map( city =>{
                                    return <Card city={city} key={city.city}/>
                                    }                          
                                )
                            }
                        </div>
                    </Carousel.Item>
                    )
                    }
                )
            } 
        </Carousel>
    </div>
    );
}

export default carouselIndex;