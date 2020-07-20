import React from 'react'

function Carousel() {
    return (
        <section className="section">
            <h2>My Movies</h2>      
            <div className="container">
                <div id="carousel-demo" className="carousel" >
                    <div className="item-1">
                    <img src={"https://picsum.photos/200/300?random=1"}/>
                    <p>movie title</p>                        
                </div>
            <div className="item-2">
            <img src={"https://picsum.photos/200/300?random=2"}/>
            <p>movie title</p>                        
            </div>
            <div className="item-3">
            <img src={"https://picsum.photos/200/300?random=3"}/>
            <p>movie title</p>                        

            </div>
            <div className="item-4">
                <img src={"https://picsum.photos/200/300?random=4"}/>                        
                <p>movie title</p>                        

            </div>
            <div className="item-5">
                <img src={"https://picsum.photos/200/300?random=5"}/>                        
                <p>movie title</p>                        

            </div>
            <div className="item-6">
            <img src={"https://picsum.photos/200/300?random=6"}/>
            <p>movie title</p>
            </div>
        </div>
        </div>
        
        </section>
    )
}






export default Carousel