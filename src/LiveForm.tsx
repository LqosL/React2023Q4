import { countries } from './redux/countries';
import { UserInfoImageless } from './types/UserInfoImaged';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './utils/FormSchema';
import { updateResults } from './redux/resultsSlice';
import { downloadAsBase64 } from './utils/Base64Exporter';

type PictureAsFile = {
  image: FileList;
};

function LiveForm() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserInfoImageless & PictureAsFile>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const submit = async (state: UserInfoImageless & PictureAsFile) => {
    dispatcher(
      updateResults({
        ...state,
        image: await downloadAsBase64(state.image[0]),
      })
    );
    navigate('/');
  };

  const [countriesToAutocomplete, setCountriesToAutocomplete] = useState<
    Array<string>
  >([]);

  const country = watch('country');
  const inputtedCountryLowercase = (country || '').toLowerCase();
  const localCountries = countries;
  useEffect(() => {
    const newCountriesToAutocomplete = localCountries.filter((country) => {
      return country.toLowerCase().includes(inputtedCountryLowercase);
    });
    if (country == null || country.length === 0) {
      if (countriesToAutocomplete.length > 0) {
        setCountriesToAutocomplete([]);
      }
      return;
    }
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
  }, [
    localCountries,
    country,
    countriesToAutocomplete,
    setCountriesToAutocomplete,
    inputtedCountryLowercase,
  ]);

  return (
    <div>
      <form className={'form'} onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor={'name_input'}> Name </label>
          <input id={'name_input'} type={'text'} {...register('name')} />
          <div>{errors.name?.message || ''}</div>
        </div>

        <div>
          <label htmlFor={'age_input'}> Age </label>
          <input
            id={'age_input'}
            type={'number'}
            min={0}
            {...register('age')}
          />
          <div>{errors.age?.message || ''}</div>
        </div>

        <div>
          <label htmlFor={'email_input'}> Email </label>
          <input id={'email_input'} type={'email'} {...register('email')} />
          <div>{errors.email?.message || ''}</div>
        </div>

        <div>
          <fieldset>
            <legend>Enter your password</legend>
            <label htmlFor={'password1_input'}> Password </label>
            <input
              id={'password1_input'}
              type={'text'}
              {...register('password1')}
            />
            <div>{errors.password1?.message || ''}</div>
            <br />
            <label htmlFor={'password2_input'}> Repeat password </label>
            <input
              id={'password2_input'}
              type={'text'}
              {...register('password2')}
            />
            <div>{errors.password2?.message || ''}</div>
          </fieldset>
        </div>

        <div>
          <fieldset>
            <legend>Gender</legend>
            <label htmlFor={'gender_input_male'}> Male </label>
            <input
              id={'gender_input_male'}
              type={'radio'}
              radioGroup={'genderGroup'}
              value={'male'}
              {...register('gender')}
            />

            <label htmlFor={'gender_input_female'}> Female </label>
            <input
              id={'gender_input_female'}
              type={'radio'}
              radioGroup={'genderGroup'}
              value={'female'}
              {...register('gender')}
            />

            <label htmlFor={'gender_input_other'}> Someone else </label>
            <input
              id={'gender_input_other'}
              type={'radio'}
              radioGroup={'genderGroup'}
              value={'other'}
              {...register('gender')}
            />
          </fieldset>
          <div>{errors.gender?.message || ''}</div>
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
              {...register('acceptTerms')}
            />
          </fieldset>
          <div>{errors.acceptTerms?.message || ''}</div>
        </div>

        <div>
          <fieldset>
            <legend>Your BEST photo ever</legend>
            <label htmlFor={'pic_input'}> Share </label>
            <input
              accept={'image/jpeg,image/png'}
              id={'pic_input'}
              type={'file'}
              {...register('image')}
            />
            <div>{errors.image?.message || ''}</div>
          </fieldset>
        </div>

        <div>
          <label htmlFor={'country_input'}> Country </label>
          <div className={'country_input_wrapper'}>
            <input
              id={'country_input'}
              type={'text'}
              {...register('country')}
            />
          </div>
          {...countriesToAutocomplete.map((country) => (
            <div key={country}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setValue('country', country);
                }}
              >
                {country}
              </button>
            </div>
          ))}
          <div>{errors.country?.message || ''}</div>
        </div>
        <button type={'submit'}> Submit </button>
      </form>
    </div>
  );
}
export default LiveForm;
