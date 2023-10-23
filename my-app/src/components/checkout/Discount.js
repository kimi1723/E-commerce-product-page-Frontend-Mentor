import classes from './DiscountForm.module.css';

const DiscountForm = () => {
	return (
		<form className={classes['form']}>
			<div className={classes['input-container']}>
				<input type="text" name="discount" id="discount" className={classes['input']} placeholder="" />
				<label htmlFor="discount" className={classes['label']}>
					Enter discount
				</label>
			</div>
			<button type="submit" className={classes['submit']}>
				Add
			</button>
		</form>
	);
};

export default DiscountForm;
