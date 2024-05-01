import React, { useState } from 'react'
import search_icon from '../img/search.png';
import Autocomplete from "react-google-autocomplete";
import { useNavigate } from 'react-router-dom';

export default function Search_module(props) {
    const [property, setProperty] = useState("Select Property Type");
    const [range, setRange] = useState("Select Property Range");
    let router = useNavigate();
    let [searchObj,setObject] = useState({
        city : '',
        isFiltered : true,
        skip : 0,
        limit : 8,
        for : '', // property type like flat house etc
        range : '',
        type : 'SELL'
    });
    const handleInput = (e) => {
        setObject({
            ...searchObj,
            [e.target.name] : e.target.value
        })
    }
    const handleRadio = (name,val) => {
        setObject({
            ...searchObj,
            [name] : val
        })
        name === 'for' ? setProperty(val) : setRange(val)
    }
    const validate = (obj) => {
        for(let i=0;i<Object.values(obj).length;i++){
            if(Object.values(obj)[i] === ''){
                return true
            }
        }
        return false
    }
    const viewResults = () => {
        let query = '?'
        Object.keys(searchObj).forEach((element,index) => {
            query += element+'='+Object.values(searchObj)[index]+'&'
        });
        router({
            pathname: '/results',
            search : query
        })
    }

    return (
        <>
            <div className="search_module">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="tabs_btn btn active" id="home-tab" data-bs-toggle="tab"  type="button" role="tab" aria-controls="home-tab-pane" onClick={handleInput} name="type" value="SELL" aria-selected="true">Buy</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn tabs_btn" id="profile-tab" data-bs-toggle="tab" type="button" role="tab" onClick={handleInput} name="type" value="RENT" aria-controls="profile-tab-pane" aria-selected="false">Rent</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                        <form onSubmit={viewResults}>
                            <div className="from_div row">
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor="location">Locations</label>
                                        <div className='iconsSet loc_set'>
                                        <Autocomplete
                                            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                            onPlaceSelected={(place) => {
                                                let obj = {
                                                    address: place.address_components[0].long_name,
                                                    city: place.address_components[1].long_name,
                                                    zipcode: place.address_components[4] ? place.address_components[4].long_name : '',
                                                    latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()
                                                }
                                                setObject({...searchObj,city : obj.city})
                                            }}
                                        />
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M6.875 10C6.875 8.27344 8.27344 6.875 10 6.875C11.7266 6.875 13.125 8.27344 13.125 10C13.125 11.7266 11.7266 13.125 10 13.125C8.27344 13.125 6.875 11.7266 6.875 10ZM10 0C10.6914 0 11.25 0.559766 11.25 1.25V2.60352C14.3906 3.13047 16.8711 5.60938 17.3945 8.75H18.75C19.4414 8.75 20 9.30859 20 10C20 10.6914 19.4414 11.25 18.75 11.25H17.3945C16.8711 14.3906 14.3906 16.8711 11.25 17.3945V18.75C11.25 19.4414 10.6914 20 10 20C9.30859 20 8.75 19.4414 8.75 18.75V17.3945C5.60938 16.8711 3.13047 14.3906 2.60352 11.25H1.25C0.559766 11.25 0 10.6914 0 10C0 9.30859 0.559766 8.75 1.25 8.75H2.60352C3.13047 5.60938 5.60938 3.13047 8.75 2.60352V1.25C8.75 0.559766 9.30859 0 10 0ZM5 10C5 12.7617 7.23828 15 10 15C12.7617 15 15 12.7617 15 10C15 7.23828 12.7617 5 10 5C7.23828 5 5 7.23828 5 10Z" fill="#02919A" />
                                            </svg></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor="location">Property Type</label>
                                        <div className="dropdown">
                                            <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                                {property}
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                                                    <path d="M15 1.0007C15 1.25656 14.8954 1.51254 14.6861 1.70752L8.25753 7.70705C7.83901 8.09765 7.16099 8.09765 6.74247 7.70705L0.313895 1.70752C-0.104632 1.31693 -0.104632 0.684165 0.313895 0.293571C0.732422 -0.097023 1.41043 -0.0970231 1.82896 0.293571L7.5 5.58628L13.1719 0.292946C13.5904 -0.0976483 14.2684 -0.0976483 14.6869 0.292946C14.8962 0.488243 15 0.744473 15 1.0007Z" fill="#02919A" />
                                                </svg></span>
                                            </button>
                                            <ul className="dropdown-menu search_drop_color">
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("for","HOUSE")}>Houses
                                                        <input type="radio" name="properties" value={searchObj.for} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("for","FLAT")}>Flat
                                                        <input type="radio" name="properties" value={searchObj.for} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("for","APARTMENT")}>Apartments
                                                        <input type="radio" name="properties" value={searchObj.for} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("for","TOWNHOME")}>TownHomes
                                                        <input type="radio" name="properties" value={searchObj.for} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("for","CONDOS / CO-OPS")}>Condos / Co-ops
                                                        <input type="radio" name="properties" value={searchObj.for} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("for","LOTS / LAND")}>Lots / Land
                                                        <input type="radio" name="properties" value={searchObj.for} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("for","MANUFACTURED")}>Manufactured
                                                        <input type="radio" name="properties" value={searchObj.for} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>


                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor="location">Range</label>
                                        <div className="dropdown">
                                            <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                                {range}
                                                <span>$</span>
                                            </button>
                                            <ul className="dropdown-menu search_drop_color">
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("range","$1,000 - $2,000")}>$1,000 - $2,000
                                                        <input type="radio" name="range" value={"$1,000 - $2,000"} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("range","$2,000 - $5,000")}>$2,000 - $5,000
                                                        <input type="radio" name="range" value={"$2,000 - $5,000"} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("range","$10,000 - $20,000")}>$10,000 - $20,000
                                                        <input type="radio" name="range" value={"$10,000 - $20,000"} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("range","$50,000 - $100,000")}>$50,000 - $100,000
                                                        <input type="radio" name="range" value={"$50,000 - $100,000"} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("range","$100,000 - $150,000")}>$100,000 - $150,000
                                                        <input type="radio" name="range" value={"$100,000 - $150,000"} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("range","$300,000 - $500,000")}>$300,000 - $500,000
                                                        <input type="radio" name="range" value={"$300,000 - $500,000"} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="selector">
                                                    <label onClick={() => handleRadio("range","$500,000 - And More")}>$500,000 - And More
                                                        <input type="radio" name="range" value={"$500,000 - And More"} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>


                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 right_end">
                                    <div className="submit_btns">
                                        <button name="location" disabled={validate(searchObj)} className='web_btn btn'  >
                                            <span><svg width="15" height="15" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.6614 17.2126L12.9157 12.6229C14.006 11.312 14.6517 9.60155 14.5911 7.70308C14.487 4.47382 12.1382 1.61651 8.98958 0.88963C4.30824 -0.190759 -0.0832497 3.39241 0.0364846 8.1948C0.117175 11.4263 2.44582 14.3023 5.5895 15.0499C7.43746 15.4899 9.24321 15.2007 10.746 14.3953L14.4917 18.9851C14.9805 19.584 15.8625 19.6733 16.4615 19.1846C17.06 18.6951 17.1496 17.8108 16.6614 17.2126ZM2.82664 7.52074C3.07558 5.06343 5.27747 3.26684 7.73505 3.5158C10.1926 3.76477 11.9895 5.96646 11.7405 8.42377C11.4916 10.8811 9.28971 12.6777 6.83212 12.4287C4.37454 12.1797 2.57763 9.97875 2.82664 7.52074Z" fill="currentColor" />
                                            </svg>
                                            </span>
                                            Search
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>
                    
                </div>
            </div>
        </>
    )
}
