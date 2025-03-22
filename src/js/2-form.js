const refs = {
  form: document.querySelector('.js-feedback-form'),
};

let formData = { email: '', message: '' };

const fillFormFields = form => {
  try {
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (formDataFromLS === null) {
      return;
    }

    formData = formDataFromLS;

    const formDataKeys = Object.keys(formDataFromLS);

    formDataKeys.forEach(key => {
      form.elements[key].value = formDataFromLS[key];
    });
  } catch (err) {
    console.log(err);
  }
};

fillFormFields(refs.form);

const onFieldChange = ({ target: formField }) => {
  const formFieldName = formField.name;
  const formFieldValue = formField.value;

  formData[formFieldName] = formFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    return alert('Fill please all fields');
  }
  console.log(formData);

  event.target.reset();
  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };
};

refs.form.addEventListener('input', onFieldChange);

refs.form.addEventListener('submit', onFormSubmit);
