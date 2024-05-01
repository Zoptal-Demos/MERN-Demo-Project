import React, { useState } from 'react'
import filter from '../img/filter.png'
import Popup from './Popup';
import { useNavigate } from 'react-router-dom'
import Autocomplete from "react-google-autocomplete";

export default function Search_listing(props) {
    const [property, setProperty] = useState(props.filter.for);
    let temprange = "$" + props.filter.range_from + " - " + "$" + props.filter.range_to
    const [range, setRange] = useState(temprange);
    const [select, setSelect] = useState(props.filter.type);
    let router = useNavigate();
    let [searchObj, setObject] = useState({
        city: props.filter.city,
        isFiltered: true,
        skip: 0,
        limit: 8,
        for: props.filter.for, // property type like flat house etc
        range: temprange,
        type: props.filter.type
    });
    const handleInput = (e) => {
        setObject({
            ...searchObj,
            [e.target.name]: e.target.value
        })
    }
    const handleRadio = (name, val) => {
        setObject({
            ...searchObj,
            [name]: val
        })
        name === 'for' ? setProperty(val) : setRange(val)
    }
    const validate = (obj) => {
        for (let i = 0; i < Object.values(obj).length; i++) {
            if (Object.values(obj)[i] === '') {
                return true
            }
        }
        return false
    }
    const viewResults = () => {
        let query = '?'
        Object.keys(searchObj).forEach((element, index) => {
            query += element + '=' + Object.values(searchObj)[index] + '&'
        });
        router({
            pathname: '/results',
            search: query
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <>
            <div className="search_filter_box mt-4">
                <form onSubmit={handleSubmit} >
                    <div className="from_div row">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <div className='iconsSet'>
                                    <Autocomplete
                                    value={searchObj.city}
                                    onChange={handleInput}
                                    name="city"
                                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                        onPlaceSelected={(place) => {
                                            let obj = {
                                                address: place.address_components[0].long_name,
                                                city: place.address_components[1].long_name,
                                                zipcode: place.address_components[4] ? place.address_components[4].long_name : '',
                                                latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()
                                            }
                                            setObject({ ...searchObj, city: obj.city })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex gap25">
                                <div className="form-group w-50">
                                    <div className="dropdown">
                                        <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            {select}
                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                                                <path d="M15 1.0007C15 1.25656 14.8954 1.51254 14.6861 1.70752L8.25753 7.70705C7.83901 8.09765 7.16099 8.09765 6.74247 7.70705L0.313895 1.70752C-0.104632 1.31693 -0.104632 0.684165 0.313895 0.293571C0.732422 -0.097023 1.41043 -0.0970231 1.82896 0.293571L7.5 5.58628L13.1719 0.292946C13.5904 -0.0976483 14.2684 -0.0976483 14.6869 0.292946C14.8962 0.488243 15 0.744473 15 1.0007Z" fill="#02919A" />
                                            </svg></span>
                                        </button>
                                        <ul className="dropdown-menu search_drop_color">
                                            <li className="selector">
                                                <label onClick={() => setSelect("RENT")}>Rent
                                                    <input type="radio" name="properties" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setSelect("SELL")}>Buy
                                                    <input type="radio" name="properties" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setSelect("AUCTION")}>Auction
                                                    <input type="radio" name="properties" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group w-100">
                                    <div className="dropdown">
                                        <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            {property}
                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                                                <path d="M15 1.0007C15 1.25656 14.8954 1.51254 14.6861 1.70752L8.25753 7.70705C7.83901 8.09765 7.16099 8.09765 6.74247 7.70705L0.313895 1.70752C-0.104632 1.31693 -0.104632 0.684165 0.313895 0.293571C0.732422 -0.097023 1.41043 -0.0970231 1.82896 0.293571L7.5 5.58628L13.1719 0.292946C13.5904 -0.0976483 14.2684 -0.0976483 14.6869 0.292946C14.8962 0.488243 15 0.744473 15 1.0007Z" fill="#02919A" />
                                            </svg></span>
                                        </button>
                                        <ul className="dropdown-menu search_drop_color">
                                            <li className="selector">
                                                <label onClick={() => handleRadio("for", "HOUSE")}>Houses
                                                    <input type="radio" name="properties" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => handleRadio("for", "FLAT")}>Flat
                                                    <input type="radio" name="properties" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => handleRadio("for", "APARTMENT")}>Apartments
                                                    <input type="radio" name="properties" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => handleRadio("for", "TOWNHOME")}>TownHomes
                                                    <input type="radio" name="properties" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => handleRadio("for", "CONDOS / CO-OPS")}>Condos / Co-ops
                                                    <input type="radio" name="properties" value={searchObj.for} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => handleRadio("for", "LOTS / LAND")}>Lots / Land
                                                    <input type="radio" name="properties" value={searchObj.for} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => handleRadio("for", "MANUFACTURED")}>Manufactured
                                                    <input type="radio" name="properties" value={searchObj.for} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="form-group w-100">
                                    <div className="dropdown">
                                        <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            {range}

                                        </button>
                                        <ul className="dropdown-menu search_drop_color">
                                            <li className="selector">
                                                <label onClick={() => setRange("$1,000 - $2,000")}>$1,000 - $2,000
                                                    <input type="radio" name="porperty" value={"$1,000 - $2,000"} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setRange("$2,000 - $5,000")}>$2,000 - $5,000
                                                    <input type="radio" name="porperty" value={"$2,000 - $5,000"} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setRange("$10,000 - $20,000")}>$10,000 - $20,000
                                                    <input type="radio" name="porperty" value={"$10,000 - $20,000"} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setRange("$50,000 - $100,000")}>$50,000 - $100,000
                                                    <input type="radio" name="porperty" value={"$50,000 - $100,000"} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setRange("$100,000 - $150,000")}>$100,000 - $150,000
                                                    <input type="radio" name="porperty" value={"$100,000 - $150,000"} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setRange("$300,000 - $500,000")}>$300,000 - $500,000
                                                    <input type="radio" name="porperty" value={"$300,000 - $500,000"} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li className="selector">
                                                <label onClick={() => setRange("$500,000 - And More")}>$500,000 - And More
                                                    <input type="radio" name="porperty" value={"$500,000 - And More"} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 right_end">
                            <div className="filter_btn_outer">
                                <button name="location" className='web_btn btn filter_btn' data-bs-target="#filter" data-bs-toggle="modal">
                                    Filter
                                    <span><img src={filter} alt="filter" /></span>
                                </button>

                            </div>
                        </div>
                        <Popup />

                    </div>
                </form>
            </div>
        </>
    )
}
