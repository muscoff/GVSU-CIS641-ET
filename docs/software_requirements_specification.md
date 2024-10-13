1. **Account Registration**
* 1.1 - User fullname will be collected from the registration form
* 1.2 - User's username and password will be collected from the registration form
* 1.2.1 - If username or password is not provided, the registration form will not process the registration request and user will be asked to provide those details.
* 1.2.2 - If username already exists, the registration form will prompt the user to provide a new username.
* 1.2.3 - If the password does not match the required length for a valid password, the registration form will not process the registration request and user will be asked to provide a valid password.
* 1.3 - If the registration form acquires all the required fields, the registration request will be processed and an account will be created for the user.

2. **Login Form**
* 2.1 - Username and password will be collected from the login form.
* 2.1.1 - If username or password is not provided, the login form will not process the request and the user would be prompted to provide those details.
* 2.1.2 - If username and password does not match a valid user in the login table, the user will be prompted to provide a valid login credentials.
* 2.2 - If username is not found in the login table, the user is redirected to the account registration page to create an account.

3. **Search product**
* 3.1 - User can search for product from the search bar
* 3.1.1 - If nothing is typed in the search bar and user press the enter key, nothing would happen dynamically to the page.
* 3.1.2 - If a user starts typing something in the search bar, the content on the page would  dynamically change to match the filtered results of the search.
* 3.1.3 - If no results is found from the search, the page would show nothing at the product section

4. Cart
* 4.1 - User can add items to the cart
* 4.1.1 - If a user tries to add an item to the cart that is already in the cart, the quantity of the item will be incremented by 1.
* 4.2 - User can remove item(s) from the cart
* 4.2.1 - User can empty the entire cart from a button press
* 4.3 - User can view items in the cart.