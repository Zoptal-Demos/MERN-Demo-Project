import React, {useState, useEffect} from 'react'
import Header from './Header'
import Modal_location from './Modal_location'
import Search_module from './Search_module'
import research from '../img/research.png'
import instant from '../img/instant.png'
import abt from '../img/abt.png'
import track from '../img/track.png'
import star_icon from '../img/star_icon.png'
import com_user from '../img/com_user.png'
import Property_list from './Property_list'
import More_Search from './More_Search'
import No_data from '../components/No_data';
import axios from 'axios'
import API from '../Api'

export default function Home() {
    const [propertyList,setProertyList] = useState([])
    const [citiesList,setCitiesList] = useState([])
    const [isLoaded,setLoaded] = useState(false)
    useEffect(()=>{
        const fetchList = async () => {
            if(!isLoaded){
                try{
                    const response = await axios.get(`${API.GET_ALL_PROPERTY}?skip=0&limit=5&isFiltered=false`)
                    setProertyList([...response.data.data.properties]);
                    setCitiesList([...response.data.data.cities]);
                    setLoaded(true)
                }catch(err){
                    console.log(err.message);
                }
            }
        }
        fetchList()
    })
    return (
        <>
            <div className="home">
                <Header />
                <h1 className='text-center heading-text' data-aos="fade-up">Find Best Property For You <br />Anywhere You Love!</h1>
                <div className="container">
                    <div className="row">
                        <div className="mt-2 module_trans">
                            <Search_module />
                        </div>
                    </div>
                </div>
            </div>
            <section className="how_it_work" >
                <div className="container">
                    <div className="row">
                        <div className="how_works_sec text-center">
                            <center>PROCESS</center>
                            <h3>How It’s Working</h3>
                        </div>
                        <ul className="working_steps text-center" >
                            <li className="list_sec">
                                <div className="icon_img not_dot">
                                    <img src={research} alt="" />
                                </div>
                                <div className="sub_heading">
                                    <h4>Research Suburbs</h4>
                                    <p>Wonder twenty hunted and put income set desire expect. Am cottage calling.</p>
                                </div>
                            </li>
                            <li className="list_sec">
                                <div className="icon_img">
                                    <img src={instant} alt="" />
                                </div>
                                <div className="sub_heading">
                                    <h4>Instant Valuation</h4>
                                    <p>Conveying or northward offending admitting perfectly my. Colonel gravit and moonlight.</p>
                                </div>
                            </li>
                            <li className="list_sec">
                                <div className="icon_img">
                                    <img src={track} alt="" />
                                </div>
                                <div className="sub_heading">
                                    <h4>Track Property</h4>
                                    <p>Moderate children at of outweigh it. Unsatiable it considered invitation he travelling insensible.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="listing_main pt-5">
                <div className="container">
                    <div className="row">
                        <h3 className='mt-3 mb-5'>Find The Best Property Today!</h3>
                        {propertyList.length <= 0 ? <No_data/> : propertyList.map((element,index)=>{
                            return <>
                            <div className="col-lg-3 mb-4" >
                            <Property_list key={element._id} data={element} />
                        </div>
                            </>
                        })}
                        

                    </div>
                </div>
            </section>
            <section className='about_us mt-5'>
                <div className="container bglight p-3">
                    <div className="row">
                        <div className="col-lg-6 position-relative">
                            <img src={abt} alt="About" className='img-fluid' />

                        </div>
                        <div className="col-lg-6 d-flex align-items-center flex-wrap">
                            <div className="comnt_box">
                                <div className="commentbox1"><img src={star_icon} alt="Star" className='me-3' />
                                    We Have More Then Five Years Experiance In Real Estate
                                </div>
                                <div className="commentbox2"><img src={com_user} alt="Users" className='me-3' />
                                    We Use Professional And Experianced Personals
                                </div>
                            </div>

                            <div className="uphead">
                                <h5 className='mb-3'>About Us</h5>
                                <h3 className='mb-3'>We Are The Best And Most <br />
                                    Tursted Real Estate  Platform</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                <ul className='about_listing mt-4'>
                                    <li>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                                            <circle cx="17" cy="17" r="17" fill="#1384F7" fillOpacity="0.2" />
                                            <path d="M24.7269 14.7403L15.4637 23.7348C15.2817 23.9116 15.0654 24 14.8151 24C14.5647 24 14.3485 23.9116 14.1664 23.7348L9.27312 18.9834C9.09104 18.8066 9 18.5967 9 18.3536C9 18.1105 9.09104 17.9006 9.27312 17.7238L10.5249 16.5083C10.707 16.3315 10.9232 16.2431 11.1735 16.2431C11.4239 16.2431 11.6401 16.3315 11.8222 16.5083L14.8151 19.4144L22.1778 12.2652C22.3599 12.0884 22.5761 12 22.8265 12C23.0768 12 23.293 12.0884 23.4751 12.2652L24.7269 13.4807C24.909 13.6575 25 13.8674 25 14.1105C25 14.3536 24.909 14.5635 24.7269 14.7403Z" fill="#02919A" />
                                        </svg></span>Parteners Who Have Worked With Us</li>
                                    <li><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                                        <circle cx="17" cy="17" r="17" fill="#1384F7" fillOpacity="0.2" />
                                        <path d="M24.7269 14.7403L15.4637 23.7348C15.2817 23.9116 15.0654 24 14.8151 24C14.5647 24 14.3485 23.9116 14.1664 23.7348L9.27312 18.9834C9.09104 18.8066 9 18.5967 9 18.3536C9 18.1105 9.09104 17.9006 9.27312 17.7238L10.5249 16.5083C10.707 16.3315 10.9232 16.2431 11.1735 16.2431C11.4239 16.2431 11.6401 16.3315 11.8222 16.5083L14.8151 19.4144L22.1778 12.2652C22.3599 12.0884 22.5761 12 22.8265 12C23.0768 12 23.293 12.0884 23.4751 12.2652L24.7269 13.4807C24.909 13.6575 25 13.8674 25 14.1105C25 14.3536 24.909 14.5635 24.7269 14.7403Z" fill="#02919A" />
                                    </svg></span>Property And Houses Ready For Occupancy</li>
                                    <li><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                                        <circle cx="17" cy="17" r="17" fill="#1384F7" fillOpacity="0.2" />
                                        <path d="M24.7269 14.7403L15.4637 23.7348C15.2817 23.9116 15.0654 24 14.8151 24C14.5647 24 14.3485 23.9116 14.1664 23.7348L9.27312 18.9834C9.09104 18.8066 9 18.5967 9 18.3536C9 18.1105 9.09104 17.9006 9.27312 17.7238L10.5249 16.5083C10.707 16.3315 10.9232 16.2431 11.1735 16.2431C11.4239 16.2431 11.6401 16.3315 11.8222 16.5083L14.8151 19.4144L22.1778 12.2652C22.3599 12.0884 22.5761 12 22.8265 12C23.0768 12 23.293 12.0884 23.4751 12.2652L24.7269 13.4807C24.909 13.6575 25 13.8674 25 14.1105C25 14.3536 24.909 14.5635 24.7269 14.7403Z" fill="#02919A" />
                                    </svg></span>People Belives In Our Service</li>
                                </ul>
                                <div className="learn_more_btn mt-5">
                                    <button className='btn web_btn w-25'>Learn More</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            <section className='more_search mt-5'>
                <div className="container">
                    <div className="row">
                        <h3>Most Popular Searches</h3>
                        <div className="col-lg-7">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.Lorem Ipsum is simply dummy text.</p>
                        </div>
                    </div>
                    <div className="more_searches_sec row mt-3">
                        {citiesList.map((element,index)=>{
                            return <>
                            <div className="col-lg-3 mb-4">
                            <More_Search moreimg={element.image_link} name={element.name} />
                        </div>
                            </>
                        })}
                        

                    </div>
                </div>
            </section>

        </>
    )
}
