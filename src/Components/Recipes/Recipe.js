import React from 'react';
import './Recipe.css'

import { GiChefToque } from 'react-icons/gi';
import { MdTimer } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

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

        <div className="recipe-card">
            <div className="row recipe-row">
                <div className="col-lg-4 p-0 recipe-image-container">
                    {imageSuffix ? <img src={imageDomain} alt="food" /> : null}
                </div>
                <div className="col-lg-8 p-0 recipe-header">
                    <Link to={recipePagePath}><h1 onClick={getRecipeId.bind(this, recipeId)}>{recipeName}</h1></Link>
                    <p>{description}</p>
                    <div className="additional-info">
                        <MdTimer /> {preparationTime} <GiChefToque /> {difficulty} <IoMdPerson /> {servings} {formattedDate} Posted by: {username}
                    </div>
                </div>
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

