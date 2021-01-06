import React from 'react';
import './Recipe.css'

import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Recipe = ({
    recipeId,
    recipeName,
    description,
    difficulty,
    preparationTime,
    cookingTime,
    additionalTime,
    servings,
    postDate,
    imageId,
    imageSuffix,
    username,
    userId,
    getRecipeId }) => {

    var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
    var recipePagePath = `/${recipeName}`;

    var YYYY = postDate.slice(0, 4);
    var MM = postDate.slice(5, 7);
    var DD = postDate.slice(8, 10);
    var formattedDate = `${DD}/${MM}/${YYYY}`;

    return (
        <div className="recipe-container">
            <div className="recipe-card">
                <Row className="recipe-row">
                    <Col sm={4} className="recipe-image">
                        <div className="recipe-image-container">
                            {imageSuffix ? <img src={imageDomain} alt="food" /> : null}
                        </div>
                    </Col>
                    <Col sm={8} className="recipe-header">
                        <Link to={recipePagePath}><h1 onClick={getRecipeId.bind(this, recipeId)}>{recipeName}</h1></Link>
                        <p>{description}</p>
                    </Col>
                    Preparation Time: {preparationTime} Difficulty: {difficulty} Servings: {servings} Posted Date: {formattedDate} Posted by: {username}
                </Row>
            </div>


            {/* <p>Difficulty: {difficulty}</p>
            <p>Preparation Time: {preparationTime}</p>
            <p>Cooking Time: {cookingTime}</p>
            <p>AdditionalTime: {additionalTime}</p>
            <p>Servings: {servings}</p>
            <p>Posted Date: {formattedDate}</p>
            <p>Posted by: {username}</p> */}
        </div>
    );
}

export default Recipe;

