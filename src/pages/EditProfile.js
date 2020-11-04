import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

/** Components */
import ErrorMessage from '../components/common/ErrorMessage.component';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';

const EditProfile = () => {
  const { register, handleSubmit, errors, isSubmitting } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Fragment>
      <PageTitleWithOutFilter title="Edit Profile"/>
      <section className="profile-content">
        <div className="container">
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <div className="content-block">
                <div className="content-block-title">
                  <a href="#"><i className="icon-caret-left" /> Back </a>
                  <div className="title-with-link">Edit info</div>
                </div>
                <div className="content-block-body">
                  <div className="form-wrapper editprofile-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <label htmlFor="accountName" className="label">Account Name</label>
                        <input
                          id="accountName"
                          name="accountName"
                          type="text"
                          className="form-control"
                          placeholder="Midfirst Bank"
                          autoFocus
                          ref={register({
                            required: 'Please enter your Account Name.',
                          })}
                        />
                        <ErrorMessage error={errors.accountName} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="label">Email Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="example@example.com"
                          ref={register({
                            required: 'Please enter your email address.',
                            pattern: {
                              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                              message: 'Invalid Email address or check for ending space',
                            },
                          })}
                        />
                        <ErrorMessage error={errors.email} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phoneNumber" className="label">Phone Number</label>
                        <input
                          label="phoneNumber"
                          type="tel"
                          className="form-control"
                          placeholder="+1 (234) 567-8910"
                          fieldName="phoneNumber"
                          ref={register({
                            required: 'Please enter your Phone Number',
                          })}
                        />
                        <ErrorMessage error={errors.phoneNumber} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address" className="label">Address</label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder="Midfirst Bank"
                          ref={register({
                            required: 'Please enter your Address',
                          })}
                        />
                        <ErrorMessage error={errors.address} />
                      </div>
                      <div className="form-group">
                        <button disabled={isSubmitting} type="submit" className="mt-5 btn btn-primary btn-lg btn-block">SAVE INFO</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default EditProfile;
