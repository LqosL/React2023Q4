
function RefForm() {
    return <div>
        <form className={'form'}>
            <label>
                Name
                <input type={'text'}/>
            </label>
            <label>
                Age
                <input type={'number'}/>
            </label>
            <label>
                Email
                <input type={'email'}/>
            </label>

            <fieldset>
                <label>
                    Password
                    <input type={'text'}/>
                </label>
                <label>
                    Repeat password
                    <input type={'text'}/>
                </label>
            </fieldset>

            <fieldset>
                <legend>
                    Gender
                </legend>
                <label>
                    Male
                    <input type={'radio'} radioGroup={'genderGroup'} value={'male'}/>
                </label>
                <label>
                    Female
                    <input type={'radio'} radioGroup={'genderGroup'} value={'female'}/>
                </label>
                <label>
                    Someone else
                    <input type={'radio'} radioGroup={'genderGroup'} value={'other'}/>
                </label>
            </fieldset>


            <label>
                Accept Terms and Conditions
                <input type={'checkbox'}/>
            </label>

            <label>
                Upload your pic
                <input type={"file"}/>
            </label>

            <label>
                Country
                <input type={'text'}/>
            </label>
            <button type={'submit'}> Submit </button>
        </form>
    </div>
}
export default RefForm;