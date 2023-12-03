import { useNavigate } from 'react-router-dom';
import { createRef, RefObject, useState } from 'react';
import { updateResults } from './redux/resultsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { downloadAsBase64 } from './utils/Base64Exporter';
import { ValidationError } from 'yup';
import { formSchema } from './utils/FormSchema';
import { CountriesSliceState } from './redux/countriesSlice';

function RefForm() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const countries: CountriesSliceState = useSelector<
    { countries: CountriesSliceState },
    CountriesSliceState
  >((state) => state.countries);

  const nameInputRef = createRef<HTMLInputElement>();
  const nameErrorRef = createRef<HTMLDivElement>();
  const ageInputRef = createRef<HTMLInputElement>();
  const ageErrorRef = createRef<HTMLDivElement>();
  const emailInputRef = createRef<HTMLInputElement>();
  const emailErrorRef = createRef<HTMLDivElement>();
  const password1InputRef = createRef<HTMLInputElement>();
  const password1ErrorRef = createRef<HTMLDivElement>();
  const password2InputRef = createRef<HTMLInputElement>();
  const password2ErrorRef = createRef<HTMLDivElement>();
  const genderInputRef = createRef<HTMLSelectElement>();
  const genderErrorRef = createRef<HTMLDivElement>();
  const acceptedInputRef = createRef<HTMLInputElement>();
  const acceptedErrorRef = createRef<HTMLDivElement>();
  const imageInputRef = createRef<HTMLInputElement>();
  const imageErrorRef = createRef<HTMLDivElement>();
  const countryInputRef = createRef<HTMLInputElement>();
  const countryErrorRef = createRef<HTMLDivElement>();

  const errorRefs: { [key: string]: RefObject<HTMLDivElement> } = {
    name: nameErrorRef,
    age: ageErrorRef,
    email: emailErrorRef,
    password1: password1ErrorRef,
    password2: password2ErrorRef,
    gender: genderErrorRef,
    acceptTerms: acceptedErrorRef,
    image: imageErrorRef,
    country: countryErrorRef,
  };

  const [countriesToAutocomplete, setCountriesToAutocomplete] = useState<
    Array<string>
  >([]);

  function fillCountriesToAutocomplete(currentInput: string) {
    if (currentInput.length === 0) {
      setCountriesToAutocomplete([]);
      return;
    }
    const currentInputLowercased = currentInput.toLowerCase();
    const newCountriesToAutocomplete = countries.filter((country) => {
      return country.toLowerCase().startsWith(currentInputLowercased);
    });
    let requireUpdate =
      newCountriesToAutocomplete.length != countriesToAutocomplete.length;
    for (const country of countriesToAutocomplete) {
      requireUpdate =
        requireUpdate || !newCountriesToAutocomplete.includes(country);
      if (requireUpdate) {
        break;
      }
    }

    if (requireUpdate) {
      setCountriesToAutocomplete(newCountriesToAutocomplete);
    }
  }

  async function checkInputAndSubmit() {
    for (const errorRefsKey in errorRefs) {
      const element = errorRefs[errorRefsKey].current;
      if (element != null) {
        element.innerHTML = '';
      }
    }
    let validationResult;
    try {
      validationResult = await formSchema.validate(
        {
          name: nameInputRef.current?.value || '',
          age: parseInt(ageInputRef.current?.value || '0'),
          email: emailInputRef.current?.value || '',
          password1: password1InputRef.current?.value || '',
          password2: password2InputRef.current?.value || '',
          gender: genderInputRef.current?.value || '',
          acceptTerms: acceptedInputRef.current?.checked,
          image: imageInputRef.current?.files || '',
          country: countryInputRef.current?.value || '',
        },
        {
          abortEarly: false,
          strict: true,
        }
      );
      dispatcher(
        updateResults({
          ...validationResult,
          image: await downloadAsBase64(validationResult.image[0]),
        })
      );
      navigate('/');
    } catch (e) {
      if (e instanceof ValidationError) {
        e.inner.forEach((error) => {
          const refObject: RefObject<HTMLDivElement> =
            errorRefs[error.path || ''];
          const element = refObject.current;
          if (element == null) {
            return;
          }

          const errorText = error.errors.join(', ');
          element.innerHTML = errorText;
        });
      } else {
        throw e;
      }
    }
  }
  function onSubmit(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    checkInputAndSubmit();
  }

  return (
    <div>
      <form className={'form'}>
        <div>
          <label htmlFor={'name_input'}> Name </label>
          <input id={'name_input'} type={'text'} ref={nameInputRef} />
          <div ref={nameErrorRef}></div>
        </div>

        <div>
          <label htmlFor={'age_input'}> Age </label>
          <input id={'age_input'} type={'number'} min={0} ref={ageInputRef} />
          <div ref={ageErrorRef}></div>
        </div>

        <div>
          <label htmlFor={'email_input'}> Email </label>
          <input id={'email_input'} type={'email'} ref={emailInputRef} />
          <div ref={emailErrorRef}></div>
        </div>

        <div>
          <fieldset>
            <legend>Enter your password</legend>
            <label htmlFor={'password1_input'}> Password </label>
            <input
              id={'password1_input'}
              type={'text'}
              ref={password1InputRef}
            />
            <div ref={password1ErrorRef}></div>
            <br />
            <label htmlFor={'password2_input'}> Repeat password </label>
            <input
              id={'password2_input'}
              type={'text'}
              ref={password2InputRef}
            />
            <div ref={password2ErrorRef}></div>
          </fieldset>
        </div>

        <div>
          <fieldset>
            <legend>Gender</legend>
            <select ref={genderInputRef}>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
              <option value={'other'}>Other</option>
            </select>
          </fieldset>
          <div ref={genderErrorRef}></div>
        </div>

        <div>
          <fieldset>
            <legend>Accept Terms and Conditions</legend>
            <label htmlFor={'accept_input'}>
              {' '}
              I accept all that stuff, sure{' '}
            </label>
            <input
              id={'accept_input'}
              type={'checkbox'}
              ref={acceptedInputRef}
            />
          </fieldset>
          <div ref={acceptedErrorRef}></div>
        </div>

        <div>
          <fieldset>
            <legend>Your BEST photo ever</legend>
            <label htmlFor={'pic_input'}> Share </label>
            <input
              accept={'image/jpeg,image/png'}
              id={'pic_input'}
              type={'file'}
              ref={imageInputRef}
            />
            <div ref={imageErrorRef}></div>
          </fieldset>
        </div>

        <div className={'countries_input'}>
          <label htmlFor={'country_input'}> Country </label>
          <div className={'country_input_wrapper'}>
            <input
              id={'country_input'}
              type={'text'}
              ref={countryInputRef}
              onInput={(e) =>
                fillCountriesToAutocomplete(e.currentTarget.value)
              }
            />
          </div>
          {...countriesToAutocomplete.map((country) => (
            <div className={'variant'} key={country}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const currentCountryInput = countryInputRef.current;
                  if (currentCountryInput != null) {
                    currentCountryInput.value = country;
                    setCountriesToAutocomplete([]);
                    fillCountriesToAutocomplete(country);
                  }
                }}
              >
                {country}
              </button>
            </div>
          ))}
          <div ref={countryErrorRef}></div>
        </div>
        <button type={'submit'} onClick={onSubmit}>
          {' '}
          Submit{' '}
        </button>
      </form>
    </div>
  );
}
export default RefForm;
