import React, {useState}  from 'react';
import styles from './SearchBar.module.css';

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
    
        // const sizeClass = props.small ? '' : 'is-medium';
        var searchPlaceholder = "barbers,spa,handymen";
        if({inputVal}!=null){

            searchPlaceholder =JSON.stringify({inputVal});
        }

        return(
            <form onSubmit={onSubmit}>
                <div className="field has-addons">
                    <p className="control">
                        <button className={`button is-static `}>Search</button>
                    </p>
                    <p className="control">
                        <input className={`input  ${styles['input-control']}`} 
                            onChange={onChange}
                            type="text" 
                            value={inputVal}
                            placeholder={searchPlaceholder}
                        />
                    </p>
                    <div className="control">
                        <div className={`button is-static `}>NEAR</div>
                    </div>
                    <p className="control">
                        <input className={`input  ${styles['input-control']}`} 
                            onChange={onChange}
                            type="text" 
                            value={inputVal}
                            placeholder="Where"
                        />
                    </p>
                    <div className={`button  ${styles['search-button']}`} type="submit" onClick={onSubmit}>
                        <span className={`icon is-small ${styles['search-icon']}`}><i className="fas fa-search"></i></span>
                    </div>
                </div>
            </form>
        );
    }