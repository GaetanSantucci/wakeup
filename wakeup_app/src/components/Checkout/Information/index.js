import { muiCalendarTheme } from '@/public/themes';


const CheckoutInformation = ({ previousPage, nextPage }) => {

  const data = use(areaFetch);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('' || user.address.name);
  const [results, setResults] = useState(null); // to display the result of the addresses following the api data.gouv fetch
  const [isDeliverableCity, setIsDeliverableCity] = useState([]); // to display if the city is in our database
  const [notInOurZone, setNotInOurZone] = useState(false); // to manage error if city is not in our area
  const [errorCity, setErrorCity] = useState(false);

  const handleSearchInput = async (event) => {
    if (event.target.value < 4) setResults([])
    setSearchTerm(event.target.value)

    if (searchTerm.length > 4) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${event.target.value}&type=housenumber&autocomplete=1`)
        if (response.ok) {
          const data = await response.json();
          setResults(data.features)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSetAddress = (elem) => {
    const { label, name, postcode } = elem
    const customerCity = elem.city.toLowerCase();
    const result = data.filter(o =>
      o.city.toLowerCase().includes(customerCity));

    if (result.length >= 1) {
      // setIsDeliverableCity(result)
      if (result[0].city.toLowerCase() === customerCity) {
        dispatch(setAddress({ label, name, city: elem.city, postcode }))
        dispatch(addDeliveryCost(result[0].price))
        setErrorCity(false)
      }

    } else {
      console.log("JE passe dans le else du setAddress");
      dispatch(inputValue({ inputType: 'city', value: '' }))
      dispatch(inputValue({ inputType: 'postcode', value: '' }))
      setErrorCity(true)
      setNotInOurZone(true);
    }

    // Results to undefined to close div research
    setSearchTerm(name)
    setResults([])
  }

  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: '#088519',
            fontSize: '0.8rem',
          },
          daySelected: {
            backgroundColor: '#ff00ff !important'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
          },
          color: '#252525 !important',
          notchedOutline: {
            borderColor: '#252525 !important',
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: '#252525 !important',
            fontSize: '0.9rem',
          }
        }
      }
    }
  });
  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    let customerCity = value.toLowerCase();
    if (id === 'city') {
      const result = data.filter(o =>
        o.city.toLowerCase().includes(customerCity));
      console.log('result:', result);
      if (result.length >= 1) {
        setIsDeliverableCity(result)
        if (result[0].city.toLowerCase() === customerCity) {
          console.log('customerCity:', customerCity);
          console.log('result[0].city.toLowerCase():', result[0].city.toLowerCase());
          console.log("Je valide le result ");
          // dispatch(setAddress({ label, name, city: elem.city, postcode }))
          dispatch(addDeliveryCost(result[0].price))
        }

      } else {
        setErrorCity(true)
        setNotInOurZone(true);
        console.log('setNotInOurZone:', notInOurZone);
      }
    }
    dispatch(inputValue({ inputType: id, value }));
  };

  const handleSetAdressManually = (elem) => {
    dispatch(inputValue({ inputType: 'city', value: elem.city }))
    dispatch(inputValue({ inputType: 'postcode', value: elem.zipcode }))
    dispatch(addDeliveryCost(elem.price))
    setIsDeliverableCity([])
  }

  const isBreakpoint = useMediaQuery(768) // Custom hook to check screen size, return boolean
  let widthElement = '45%'
  if (isBreakpoint) {
    widthElement = '85%' // To display calendar in middle of the page
  }

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Saisie de vos informations</h3>
        <ThemeProvider theme={muiCalendarTheme}>
          <Box
            component='form'
            sx={{
              width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', /* margin: '8rem 0 2rem 0' */
              '& > :not(style)': { m: '0.8rem', width: widthElement, fontSize: '0.8rem' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField id='lastname' label='Nom' value={user.lastname} onChange={handleInputChange} variant='outlined' size='small' required />
            <TextField id='firstname' label='Prénom' value={user.firstname} onChange={handleInputChange} variant='outlined' size='small' required />
            <TextField id='phone' label='Téléphone' value={user.phone} onChange={handleInputChange} type='tel' variant='outlined' size='small' required />
            <div className={styles.container_information}>
              <TextField id='search' className={styles.container_information_input} label='Adresse' value={searchTerm || user.address?.name} onChange={handleSearchInput} variant='outlined' size='small' required />
              {errorCity && <p className={styles.container_information_input_error}>Ville non livrable, retrouvez notre zone de livraison <Link href='/livraison'>ici</Link></p>}

              <div className={styles.container_information_address} >
                <div className={styles.container_information_address_block} >
                  {
                    results && (
                      results.map(elem => {
                        return (
                          <div className={styles.container_information_address_block_result} onClick={() => handleSetAddress(elem.properties)} key={elem.properties.id}><RoomIcon fontSize='small' /> - {elem.properties.label}</div>
                        )
                      })
                    )
                  }
                </div>
              </div>
            </div>
            <TextField id='complement' label='Bat. étage, interphone...' value={user.address?.complement} onChange={handleInputChange} variant='outlined' size='small' />
            <TextField id='postcode' label='Code postal' value={user.address?.postcode} onChange={handleInputChange} variant='outlined' size='small' required />
            <div className={styles.container_information}>
              <TextField id='city' className={styles.container_information_input} label='Ville' value={user.address?.city} onChange={handleInputChange} variant='outlined' size='small' required />
              <div className={styles.container_information_address} >
                <div className={styles.container_information_address_block} >
                  {
                    isDeliverableCity && (
                      isDeliverableCity.map((elem, index) => {
                        if (index <= 4) {
                          return (
                            <div className={styles.container_information_address_block_result} onClick={() => handleSetAdressManually(elem)} key={elem.id}>{elem.city}</div>
                          )
                        }
                      })
                    )
                  }
                </div>
              </div>
            </div>
          </Box>

        </ThemeProvider >
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
        {
          !notInOurZone ? <button onClick={nextPage}>Validez</button> : null}

      </div>
    </>
  )
}