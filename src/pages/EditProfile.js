import React, { Fragment } from 'react';
import { useForm } from "react-hook-form";

/** Components */
import HeaderMain from '../components/HeaderMain';
import Footer from '../components/Footer';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';
import TextField from '../components/form-fields/TextField';

const EditProfile = () => {
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithOutFilter/>
                <section className="profile-content">
                    <div className="container">
                        <div className="row">
                            <div className="offset-md-2 col-md-8">
                                <div className="content-block">
                                    <div className="content-block-title">
                                        <a href="#"><i className="icon-caret-left"></i> Back </a>
                                        <div className="title-with-link">Edit info</div>
                                    </div>
                                    <div className="content-block-body">
                                        <div className="form-wrapper editprofile-form">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <TextField 
                                                    label="Account name" 
                                                    type="text" 
                                                    placeholder="Midfirst Bank" 
                                                    fieldName="accountName" 
                                                    register={register({ required: true })} 
                                                    errorMsg={errors.accountName && "Account name is required"} 
                                                    required />

                                                <TextField 
                                                    label="Email address" 
                                                    type="email" 
                                                    placeholder="info@midfirstbank.com" 
                                                    fieldName="email" 
                                                    register={register({ required: true })}
                                                    errorMsg={errors.email && "Email is required"} 
                                                    required />

                                                <TextField 
                                                    label="Phone number" 
                                                    type="tel" 
                                                    placeholder="+1 (213) 393-3010" 
                                                    fieldName="phno" 
                                                    register={register({ required: true })}
                                                    errorMsg={errors.phno && "Phone Number is required"} 
                                                    required />

                                                <TextField 
                                                    label="Address" 
                                                    type="text" 
                                                    placeholder="Midfirst Bank" 
                                                    fieldName="address" 
                                                    register={register({ required: true })}
                                                    errorMsg={errors.address && "Address is required"} 
                                                    required />

                                                <button type="submit" className="mt-5 btn btn-primary btn-lg btn-block">SAVE INFO</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </Fragment>
    );
};

export default EditProfile;