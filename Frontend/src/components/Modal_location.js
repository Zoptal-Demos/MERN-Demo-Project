import React from 'react'
import Autocomplete from "react-google-autocomplete";
export default function More_Search(props) {
    return (
        <>
            <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                    let obj = {
                        address: place.address_components[0].long_name,
                        city: place.address_components[1].long_name,
                        zipcode: place.address_components[4].long_name,
                        latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()
                    }
                    props.onGetLocation(obj)
                }}
            />
        </>
    )
}
