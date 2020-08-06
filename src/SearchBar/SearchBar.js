import React, {useState}  from 'react';
import styles from './SearchBar.module.css';
import {setInputVal} from '../Search/Search';
import {search} from '../Search/Search';
import { Link } from 'react-router-dom';

export const SearchBar = ({inputVal, onChange, onSubmit}) => {
    // const [term, setTerm] = useState(props.term || '');
    // const [location, setLocation] = useState(props.location || '');
   
   
   
   
    // function submit(e) {
    //     if(typeof props.search === 'function') {
    //         props.search(term, location);
    //     }
    //     console.log(term, location);
    //     e.preventDefault();
    // }
    
       //const sizeClass = props.small ? '' : 'is-medium';
        return(
            <form onSubmit={onSubmit}>
                <div className="field has-addons">
                    <p className="control">
                        <button className={`button is-static `}>Search</button>
                    </p>
                    <p className="control">
                        <input className={`input ${styles['input-control']}`} 
                             value={inputVal}
                            onChange={onChange}
                            type="text" 
                            //onSubmit={() => search({ variables: { match: `%${inputVal}%` } })}
                            placeholder="barbers, spas, handymen"
                        />
                    </p>
                    <div className="control">
                        <div className={`button is-static`}>NEAR</div>
                    </div>
                    <p className="control">
                        <input className={`input ${styles['input-control']}`} 
                            
                            type="text" 
                            
                            placeholder="Where"
                        />
                    </p>
                    <Link to="/search">
                    <div className={`button  ${styles['search-button']}`} to="/search" onClick={onSubmit}>
                        <span className={`icon is-small ${styles['search-icon']}`}><i className="fas fa-search"></i></span>
                    </div>
                    </Link>
                </div>
            </form>
        );
    }

    export default SearchBar;