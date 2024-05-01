import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Header from '../components/Header'
import Property_list from '../components/Property_list'
import Search_listing from '../components/Search_listing'
import No_data from '../components/No_data';
import two from '../img/two.png'
import axios from 'axios'
import APIFunctions, { getRequest } from '../ApiFunctions'
import API from '../Api';

export default function Results() {
    const search = useLocation().search;
    const data = new URLSearchParams(search);
    let temp = data.get('range').split("-")
    let obj = {
        city: data.get('city'),
        for: data.get('for'),
        range_from: temp[0].trim().replace("$", "").replace(",", ""),
        range_to: temp[1].trim().replace("$", "").replace(",", ""),
        type: data.get('type')
    }
    const [propertyList, setProertyList] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    useEffect(() => {
        const fetchList = async () => {
            if (!isLoaded) {
                try {
                    const response = await getRequest(API.GET_ALL_PROPERTY,`?skip=0&limit=5&isFiltered=true&city=${obj.city}&for=${obj.for}&range_from=${obj.range_from}&range_to=${obj.range_to}&type=${obj.type}`)
                    setProertyList([...response.data.data]);
                    // setCitiesList([...response.data.data.cities]);
                    setLoaded(true)
                } catch (err) {
                    console.log(err.message);
                }
            }
        }
        fetchList()
    })
    return (
        <>
            <Header />
            <div className="results_property">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <Search_listing filter={obj} />
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                </div>
                <div className="search_listing_result mt-3">

                    <div className="container">
                        <div className="row">
                            <div className="title mt-3 mb-3">Explore The Properties For Sell</div>
                            {propertyList.length <= 0 ? <No_data /> : propertyList.map((element, index) => {
                                return <>
                                    <div className="col-lg-3 mb-4" >
                                        <Property_list key={element._id} data={element} />
                                    </div>
                                </>
                            })}
                        </div>
                        <div className="load_more d-flex justify-content-center mt-5">
                            <button className='btn light_btn w-25'>..... Explore More Properties</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
