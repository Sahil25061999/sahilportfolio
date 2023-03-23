const formInputName = document.querySelector('#name');
const nameLabel = document.querySelector('#forName');
const formInputEmail = document.querySelector('#email');
const emailLabel = document.querySelector('#forEmail');
const formInputDescription = document.querySelector('#description');
const descriptionLabel = document.querySelector('#forDescription');
const formBtn = document.querySelector('.contact__form__btn');

const emailInner = emailLabel.innerHTML;
const nameInner = nameLabel.innerHTML;
const descriptionInner = descriptionLabel.innerHTML;

// formBtn.addEventListener('click', (e) => {
//   console.log(e);
//   //   e.preventDefault();
// });

function labelEdit(e, currLabel, currInner) {
  if (e.target.value.length) {
    currLabel.innerHTML = '';
  } else {
    currLabel.innerHTML = currInner;
  }
}

window.onload = () => {
  formInputName.value = '';
  formInputEmail.value = '';
  formInputDescription.value = '';
};

formInputEmail.addEventListener('change', (e) => {
  console.log(formInputEmail);
  labelEdit(e, emailLabel, emailInner);
});

formInputEmail.addEventListener('click', () => {
  console.log(formInputEmail);
});

formInputName.addEventListener('change', (e) =>
  labelEdit(e, nameLabel, nameInner)
);
formInputDescription.addEventListener('change', (e) =>
  labelEdit(e, descriptionLabel, descriptionInner)
);
