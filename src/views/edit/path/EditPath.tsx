import React, { useEffect, useState, ChangeEvent } from 'react';

import styles from '../Edit.module.scss';

interface EditPathProps {
    path: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    savePath: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditPath: React.FC<EditPathProps> = ({ path, handleChange, savePath }) => {
    return (
        <form className={styles.form} action="" id="edit_path">
            <div className={styles['form-item-flex']}>
                <label className={styles.label} htmlFor="path">Path:</label>
                <input
                    className={styles.input}
                    type="text"
                    name="path"
                    placeholder="Path"
                    value={path ?? ''}
                    onChange={handleChange}
                />
            </div>

            <button className={styles.button} onClick={savePath}>
                <h3 className="title">save path</h3>
            </button>
        </form>
    )
}