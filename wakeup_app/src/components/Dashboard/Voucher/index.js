export const DashboardVoucher = () => {
  return (
    <div>
      <h2>Voucher Page</h2>

      <div className={styles.container}>
        <TextField id='voucherId'
          label='Numéro du voucher'
          variant='standard'
          size='small'
          sx={{ mb: 2, width: '50%' }}
          required
        />
        <TextField id='voucherAmount'
          label='Montant du voucher'
          variant='standard'
          size='small'
          sx={{ mb: 2, width: '47%' }}
          required
        />
        <TextField id='voucherDate'
          label="Date d'expiration du voucher"
          variant='standard'
          size='small'
          sx={{ mb: 2, width: '47%' }}
          required
          />
      </div>

    </div>
  )
}