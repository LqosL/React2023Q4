import { useNavigate } from 'react-router-dom';

function RefForm() {
  const navigator = useNavigate();

  return (
    <div>
      <form className={'form'}>
        <label htmlFor={'name_input'}> Name </label>
        <input id={'name_input'} type={'text'} />

        <label htmlFor={'age_input'}> Age </label>
        <input id={'age_input'} type={'number'} />

        <label htmlFor={'email_input'}> Email </label>
        <input id={'email_input'} type={'email'} />

        <fieldset>
          <legend>Enter your password</legend>
          <label htmlFor={'password1_input'}> Password </label>
          <input id={'password1_input'} type={'text'} />
          <br />
          <label htmlFor={'password2_input'}> Repeat password </label>
          <input id={'password2_input'} type={'text'} />
        </fieldset>

        <fieldset>
          <legend>Gender</legend>
          <label htmlFor={'gender_input_male'}> Male </label>
          <input
            id={'gender_input_male'}
            type={'radio'}
            radioGroup={'genderGroup'}
            value={'male'}
          />

          <label htmlFor={'gender_input_female'}> Female </label>
          <input
            id={'gender_input_female'}
            type={'radio'}
            radioGroup={'genderGroup'}
            value={'female'}
          />

          <label htmlFor={'gender_input_other'}> Someone else </label>
          <input
            id={'gender_input_other'}
            type={'radio'}
            radioGroup={'genderGroup'}
            value={'other'}
          />
        </fieldset>

        <fieldset>
          <legend>Accept Terms and Conditions</legend>
          <label htmlFor={'accept_input'}>
            {' '}
            I accept all that stuff, sure{' '}
          </label>
          <input id={'accept_input'} type={'checkbox'} />
        </fieldset>

        <fieldset>
          <legend>Your BEST photo ever</legend>
          <label htmlFor={'pic_input'}> Share </label>
          <input id={'pic_input'} type={'file'} />
        </fieldset>

        <label htmlFor={'country_input'}> Country </label>
        <div className={'country_input_wrapper'}>
          <input id={'country_input'} type={'text'} />
        </div>
        <button
          type={'submit'}
          onClick={() => {
            navigator('/');
          }}
        >
          {' '}
          Submit{' '}
        </button>
      </form>
    </div>
  );
}
export default RefForm;
