import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => (
    <div className={classes.sk_cube_grid}>
    <div className={[classes.sk_cube, classes.sk_cube1].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube2].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube3].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube4].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube5].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube6].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube7].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube8].join(' ')}></div>
    <div className={[classes.sk_cube, classes.sk_cube9].join(' ')}></div>
    </div>
);

export default spinner;