import { useState, useEffect } from "react";
import logo from "../img/logo-white.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import Loader from "./Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { cfg } from "../utils/firebaseConfig";

// Initialize Firebase
const app = initializeApp(cfg);
const db = getFirestore(app);


const Auth = () => {
    const [user, setUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const notify = (category, message) => {
        if (category === "info") {
          toast.info(message);
        }
        if (category === "warn") {
          toast.warn(message);
        }
        if (category === "success") {
          toast.success(message);
        }
        if (category === "error") {
          toast.error(message);
        }
      };

    const loginHandler = async(email, password) => {
        const auth = getAuth();
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            setIsLoading(false)
            notify("success", "Login successful")
            setUser(userCredential.user);
            // ...
          })
          .catch((error) => {
            setIsLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            notify("error", errorMessage)
            return
          });
      }

    useEffect(() => {
        if (user) {
            console.log('user: ' + user)
            navigate('/stats');
        }
    }, [user, navigate]);

    useEffect(() => {
        console.log(db)
    }, []);

  return (
    <>
    <ToastContainer />
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col p-8 rounded-lg bg-slate-700 w-[80%] md:w-[50vw] lg:w-[40vw] max-w-[400px]">
        <img src={logo} alt="Chippin Logo" className="w-[100px] mx-auto" />
        <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async(values, { setSubmitting }) => {
                try{
                  await loginHandler(values.email, values.password)
                  setSubmitting(false);
                  return
                } catch(e){
                  console.log(e)
                  console.log('FAILED!')
                  return
                }  
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col h-[25vh] min-h-[250px] justify-between"
              >
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email Address"
                    className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                  />
                  <div className="text-error-500">
                    {errors.email && touched.email && errors.email}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                    />
                    { showPassword ? <AiFillEyeInvisible className="absolute right-2 top-7 text-grey-light hover:text-purple cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <AiFillEye className="absolute right-2 top-7 text-grey-light hover:text-purple cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> }
                  </div>

                  <div className="text-error-500">
                    {errors.password && touched.email && errors.password}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-info mt-8 flex justify-center relative"
                >
                  {isloading ? <Loader w="25" /> : 'Login'}
                </button>
              </form>
            )}
          </Formik>
        {/*  */}
        </div>
    </div>
    </>
  );
};

export default Auth;
