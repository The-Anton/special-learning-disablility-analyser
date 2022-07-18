import React from "react";
import Card from "../../component/card/card";
import './HomePage.css';

function HomePage(){
    return (
        <div className="home-page">
            <header>
                <h1> Your Altruistic CheckList </h1>
                <p> Take the test and get the result in one report </p>
            </header>
    
            <div className='test-cards'>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>

            <footer>
                <p> Select the text u wanna to give in one go. 
                    You will get the result at the end of all the selected test 
                    mentioned above. </p>
            </footer>
        </div>
    );
}

export default HomePage;