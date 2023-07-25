# Bear in Mind | Angular

The Bear in Mind is a free open-source LMS (learning management system). This is the Angular frontend integrated with
backend microservices.

## Demo

You can run this application without setting up backend microservices. All you need to is run the following command:

```bash
ng serve --configuration mock
```

You can log in to any user defined in the [mock-user-data.ts][users] file. Each user's password is `password`.

## Security

### Authorization

Application authorization is done using cookies with the `Secure` and `HttpOnly` flags set. This makes JavaScript unable
to access the user's token, instead the browser is responsible for its storage and use.

### Sending passwords

Passwords sent during signing up and logging in are hashed with the SHA-256 algorithm. We have decided on such a
solution
not to use the user's plaintext password at any stage of communication, not even over HTTPS. However, bear in mind that
this approach must be consistent for each of your Bear in Mind frontend, otherwise the user may have problems logging
into their account.

If you wish to opt out of client-side hashing, you can do so without significant security impact as passwords are
additionally hashed server-side.

## Project status

We are currently at the MVP (minimum viable product) stage. New features are already designed, and we are actively
implementing them. At the moment, we do not have a planned production release date.

## Contribution

Your contribution is welcome and we appreciate it. 💝 Before you start, please make sure you have read
the [information for contributors][contributing].

## Code of Conduct

This project is governed by the [Bear in Mind Code of Conduct][conduct]. By participating, you are expected to uphold
this code of conduct.

## License

Bear in Mind Angular is released under the [Apache 2.0 License][license].

## Attribution

### Illustrations

All illustrations by [storyset][author-stories] on Freepik.

### Photos

- Login page background: Photo by [Vadim Sherbakov][author-vadim-sherbakov] on [Unsplash][unsplash-vadim-sherbakov]
- Course placeholder: Photo by [Aaron Burden][author-aaron-burden] on [Unsplash][unsplash-aaron-burden]
- User group placeholder: Photo by [The Climate Reality Project][author-climate-reality]
  on [Unsplash][unsplash-climate-reality]
- Java course: Photo by [Nathan Dumlao][author-nathan-dumlao] on [Unsplash][unsplash-nathan-dumlao]
- Spring Framework course: Photo by [Joel Holland][author-joel-holland] on [Unsplash][unsplash-joel-holland]
- React course: Photo by [Leonhard Niederwimmer][author-leonhard-niederwimmer]
  on [Unsplash][unsplash-leonhard-niederwimmer]
- PostgreSQL course: Photo by [atwena Goodman][author-atwena-goodman] on [Unsplash][unsplash-atwena-goodman]
- Docker course: Photo by [Swanson Chan][author-swanson-chan] on [Unsplash][unsplash-swanson-chan]
- Kubernetes course: Photo by [Joseph Barrientos][author-joseph-barrientos]
  on [Unsplash][unsplash-joseph-barrientos]
- Gamification in Education course: Photo by [Igor Karimov][author-igor-karimov] on [Unsplash][unsplash-igor-karimov]
- English course: Photo by [Charles "Duck" Unitas][author-charles-duck-unitas]
  on [Unsplash][unsplash-charles-duck-unitas]
- Administrators user group: Photo by [Kevin Ku][author-kevin-ku] on [Unsplash][unsplash-kevin-ku]
- Teachers user group: Photo by [ThisisEngineering RAEng][author-this-is-engineering]
  on [Unsplash][unsplash-this-is-engineering]

[users]: https://github.com/bear-in-mind-lms/bear-in-mind-angular/blob/main/src/mock/user/mock-user-data.ts

[contributing]: https://github.com/bear-in-mind-lms/bear-in-mind-core/blob/main/CONTRIBUTING.md

[conduct]: https://github.com/bear-in-mind-lms/bear-in-mind-core/blob/main/CODE_OF_CONDUCT.md

[license]: https://www.apache.org/licenses/LICENSE-2.0

[author-stories]: https://www.freepik.com/author/stories

[author-vadim-sherbakov]: https://unsplash.com/@madebyvadim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-vadim-sherbakov]: https://unsplash.com/photos/d6ebY-faOO0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-climate-reality]: https://unsplash.com/@climatereality?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-climate-reality]:https://unsplash.com/photos/selective-focus-photography-of-people-sitting-on-chairs-while-writing-on-notebooks-Hb6uWq0i4MI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-aaron-burden]: https://unsplash.com/@aaronburden?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-aaron-burden]: https://unsplash.com/photos/QJDzYT_K8Xg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-nathan-dumlao]: https://unsplash.com/@nate_dumlao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-nathan-dumlao]: https://unsplash.com/photos/XOhI_kW_TaM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-joel-holland]: https://unsplash.com/@joelholland?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-joel-holland]: https://unsplash.com/photos/TRhGEGdw-YY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-leonhard-niederwimmer]: https://unsplash.com/@lnlnln?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-leonhard-niederwimmer]: https://unsplash.com/photos/12Tdn6oLvSU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-atwena-goodman]: https://unsplash.com/@atwena?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-atwena-goodman]: https://unsplash.com/photos/PB4dNSELi_E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-swanson-chan]: https://unsplash.com/@alien_spaceship?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-swanson-chan]: https://unsplash.com/photos/wG2rXmRgyVA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-joseph-barrientos]: https://unsplash.com/@jbcreate_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-joseph-barrientos]: https://unsplash.com/photos/eUMEWE-7Ewg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-igor-karimov]: https://unsplash.com/@ingvar_erik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-igor-karimov]: https://unsplash.com/photos/59MGmlUiqwA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-charles-duck-unitas]: https://unsplash.com/@unitasphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-charles-duck-unitas]: https://unsplash.com/photos/hPq1nLfLgBY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-kevin-ku]: https://unsplash.com/@ikukevk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-kevin-ku]: https://unsplash.com/photos/w7ZyuGYNpRQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[author-this-is-engineering]: https://unsplash.com/@thisisengineering?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

[unsplash-this-is-engineering]: https://unsplash.com/photos/woman-in-blue-tank-top-standing-beside-white-wall-TXxiFuQLBKQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
