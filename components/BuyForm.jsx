import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";


function BuyForm(props) {
  const [loading, setLoading] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Invalid Email Address"),
      tel: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
    }),
    onSubmit: (values) => {
      createCheckOutSession();
    },
  });

  let stripePromise = null;

  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout/session", {
      item: {
        name: props.name,
        price: props.price,
        description: props.description,
        metadata: {
          event: props.path,
          customer_name: formik.values.firstName,
          customer_email: formik.values.email,
        }
      },
    });
    
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      console.log(result);
    } else {
      
    }
    setLoading(false);
  };

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form-numeprenume">
          <div className="form-flex">
            <input
              name="firstName"
              type="text"
              className="form-prenume"
              id="firstName"
              placeholder="First Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="form-error">{formik.errors.firstName}</p>
            ) : null}
          </div>
          <div className="form-flex">
            <input
              name="lastName"
              type="text"
              className="form-nume"
              id="lastName"
              placeholder="Last Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="form-error">{formik.errors.lastName}</p>
            ) : null}
          </div>
        </div>
        <input
          name="email"
          type="email"
          className="form-email"
          id="email"
          placeholder="Email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="form-error">{formik.errors.email}</p>
        ) : null}
        <input
          name="tel"
          type="tel"
          className="form-tel"
          id="tel"
          placeholder="Phone Number"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.tel}
        />
        {formik.touched.tel && formik.errors.tel ? (
          <p className="form-error">{formik.errors.tel}</p>
        ) : null}
        <button type="submit" className="form-submit" id="submit">
          {loading ? "Processing..." : "Reserve"}
        </button>
      </form>
    </div>
  );
}

export default BuyForm;
