import React, { useEffect, useState } from "react";
import "./Wishlist.scss";

import axios from "axios";
import API_URL from "../../../Config";

import PropertyCard from "../../../Components/PropertyCard/PropertyCard";
import { toast } from "react-toastify";

const Wishlist = () => {

    const token = localStorage.getItem("token");

    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);

    // ==========================
    // Fetch Wishlist
    // ==========================

    const fetchWishlist = async () => {

        try {

            const res = await axios.get(

                `${API_URL}/api/wishlist`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setWishlist(res.data.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchWishlist();

    }, []);
     const removeWishlist = async (propertyId) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(

                `${API_URL}/api/wishlist/${propertyId}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            toast.success("Removed from wishlist");

            fetchWishlist();

        }

        catch (error) {

            toast.error("Unable to remove property");

        }

    };

    if (loading) {

        return <h2>Loading Wishlist...</h2>;

    }

    return (

        <>

            <div className="wishlist-top">

                <h2>

                    My Wishlist

                </h2>

                <p>

                    Saved Properties

                </p>

            </div>

            {
                wishlist.length === 0 ?

                    (

                        <div className="empty">

                            <h3>

                                No Property In Wishlist

                            </h3>

                        </div>

                    ):(

                        <div className="wishlist-grid">
                            { wishlist.map((item) => (

                                    <PropertyCard

                                        key={item.property._id}

                                        property={item.property}
                                        isWishlisted={true}
                                        onWishlistClick={removeWishlist}

                                        view="grid"

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </>

    );

};

export default Wishlist;