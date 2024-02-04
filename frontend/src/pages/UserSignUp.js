import '../css/Login.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayMessage from '../components/DisplayMessage';
import Footer from '../components/Footer';
import UserService from '../services/UserService';
import ValidationError from '../components/ValidationError';

function UserSignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isMatching, setIsMatching] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState();
  const [isCriteriaVisible, setIsCriteriaVisible] = useState(false);
  const [passCriteria, setPassCriteria] = useState([
    {
      id: 1,
      name: 'Length is at least 10 letters or digits',
      isValid: false,
    },
    {
      id: 2,
      name: 'Contains at least a lower case letter',
      isValid: false,
    },
    { 
      id: 3,
      name: 'Contains at least an upper case letter',
      isValid: false,
    },
    {
      id: 4,
      name: 'Contains at least a special case letter',
      isValid: false,
    },
  ])

  async function submitHandler(e) {
    e.preventDefault();

    if (await validatePassword()) {
      setIsCriteriaVisible(false);
    } else {
      setIsCriteriaVisible(true);
      return;
    }
    
    const res = await UserService.singup({
                  email: emailRef.current.value,
                  password: passwordRef.current.value
                });
    if (res) {
      if (res.success) {
        localStorage.setItem('token', res.data);
        navigate('/');
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  const validatePassword = async () => {
    setIsCriteriaVisible(false);
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const hasLengthOf10 = new RegExp('(?=.{10,})');
    const hasOneLowerCase = new RegExp('(?=.*[a-z])');
    const hasOneUpperCase = new RegExp('(?=.*[A-Z])');
    const hasOneSpecialChar = new RegExp('(?=.*[^A-Za-z0-9])');

    passCriteria.forEach(item => item.isValid = false);

    if(password === confirmPassword) {
      setIsMatching(true);
    } else {
      setIsMatching(false);
    }

    if(hasLengthOf10.test(password)) {
      await replaceCriteria(1);
    }

    if(hasOneLowerCase.test(password)) {
      await replaceCriteria(2);
    }

    if(hasOneUpperCase.test(password)) {
      await replaceCriteria(3);
    }

    if(hasOneSpecialChar.test(password)) {
      await replaceCriteria(4);
    }

    return (passCriteria.every(item => {
      return item.isValid;
    }));
  }

  const replaceCriteria = async (id) => {
    const idx = passCriteria.findIndex(c => c.id === id);
    passCriteria[idx].isValid = true;
    setPassCriteria(passCriteria);
  }

  return (
    <div className='login'>
      <div className='box'>
        <h1 className='ml'>Create account</h1>
        <form method='post' onSubmit={submitHandler}>
          <div className='error_container'>
            {error && <DisplayMessage message={error} type="error" />}
          </div>
          <div className='form_control_wrapper'>
            <div className='form_control'>
              <label className="label">Email</label>
            </div>
            <div className='form_control'>
              <input ref={emailRef} type='email' name="email" required
                placeholder='Email' className='input' />
            </div>
          </div>

          <div className='form_control_wrapper'>
            <div className='form_control'>
              <label className="label">Password</label>
            </div>
            <div className='form_control'>
              <input ref={passwordRef} type='password' name="password"
                required placeholder='Password' className='input' />
            </div>
          </div>

          <div className='form_control_wrapper'>
            <div className='form_control'>
              <label className="label">Confirm password </label>
            </div>
            <div className='form_control'>
              <input ref={confirmPasswordRef} type='password' name="confirmPassword"
                required placeholder='Confirm password' className='input' />
            </div>
          </div>

          {}

          <div >
              { isCriteriaVisible && <>
                <div style={{ padding: '1rem', lineHeight: '2'}}>
                  { !isMatching ? <div className='invalid-criteria'> <b>Passwords do not match</b> </div> :
                    <>
                      { passCriteria.map((item) => <ValidationError key={item.id} item={item} />
                      )}
                    </>
                  }
                  </div> 
              </>
              }
          </div>
          
          <div className='actions'>
            <button className='btn medium ml'>Create account</button>
          </div>
        </form>

        <div className='ml'>
          <span>Already have an account?</span>&nbsp;
          <a href="/login">Sign in</a>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default UserSignUp;