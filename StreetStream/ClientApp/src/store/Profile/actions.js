import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {changeIsLogged, refreshToken, setRole} from "../App/actions";
import {closeModal} from "../Event/actions";

const TOKEN = 'Bearer ' + window.localStorage.getItem("access_token");
const logOutUser = () => {
    return {
        type: 'LOG_OUT',
    }
}

const fetchProfileRequest = () => {
    return {
        type: 'FETCH_PROFILE_REQUEST'
    }
}

const fetchProfileSuccess = (events) => {
    return {
        type: 'FETCH_PROFILE_SUCCESS',
        payload: events
    }
}

const fetchProfileFailure = (error) => {
    return {
        type: 'FETCH_PROFILE_FAILURE',
        payload: error
    }
}

const fetchUpdateProfileRequest = () => {
    return {
        type: 'FETCH_UPDATE_PROFLILE_REQUEST'
    }
}

const fetchUpdateProfileRequestSuccess = (profile) => {
    return {
        type: 'FETCH_UPDATE_PROFLILE_SUCCESS',
        payload: profile
    }
}

const fetchUpdateProfileRequestFailure = (error) => {
    return {
        type: 'FETCH_UPDATE_PROFLILE_FAILURE',
        payload: error
    }
}

const fetchDeleteProfileRequest = () => {
    return {
        type: 'FETCH_DELETE_PROFLILE_REQUEST'
    }
}

const fetchDeleteProfileRequestSuccess = () => {
    return {
        type: 'FETCH_DELETE_PROFLILE_SUCCESS'
    }
}

const fetchDeleteProfileRequestFailure = (error) => {
    return {
        type: 'FETCH_DELETE_PROFLILE_FAILURE',
        payload: error
    }
}

export const fetchProfile = () => {
    return (dispatch) => {
        dispatch(fetchProfileRequest());
        axios.get(SERVER_URL + '/api/accounts/profile', {
            headers: {
                authorization: TOKEN
            }
        }).then(response => {
            const profile = response.data;
            const events = [];
            if (profile.subscriptions !== undefined) {
                profile.subscriptions.forEach(function (subscription) {
                    subscription.commercialAccount.events.forEach(item => {
                        item.date = (item.date.split('T'))[0];
                        events.push(item)
                    })
                });
                profile.upcommingEvents = events;
            }
            console.log("PROFILE ", profile);
            dispatch(fetchProfileSuccess(profile));
        }).catch(error => {
            if (error.response !== undefined) {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    dispatch(fetchProfileFailure());
                    dispatch(refreshToken());
                }
            } else {
                dispatch(fetchProfileFailure("Some Error"));
            }
        });
    }
}

export const fetchUpdateProfile = (profile) => {
    console.log(profile);
    if (profile.role === "COMMERCIALACCOUNT") {
        return (dispatch) => {
            dispatch(fetchUpdateProfileRequest());
            axios.put(SERVER_URL + '/api/commercialaccounts', {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                password: profile.password,
                telephone: profile.telephone,
                description: profile.description
            }, {
                headers: {
                    authorization: TOKEN
                }
            })
                .then(response => {
                    const account = response.data;
                    dispatch(fetchUpdateProfileRequestSuccess(account));
                    dispatch(closeModal());
                }).catch(error => {
                dispatch(fetchUpdateProfileRequestFailure(error.message));
            });
        }
    }
    if (profile.role === "REGULARACCOUNT") {
        return (dispatch) => {
            dispatch(fetchUpdateProfileRequest());
            axios.put(SERVER_URL + '/api/regularaccounts', {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                password: profile.password
            }, {
                headers: {
                    authorization: TOKEN
                }
            })
                .then(response => {
                    const account = response.data;
                    dispatch(fetchUpdateProfileRequestSuccess(account));
                    window.location.reload();
                }).catch(error => {
                dispatch(fetchUpdateProfileRequestFailure(error.message));
            });
        }
    }
}

export const fetchDeleteProfile = (role) => {
    if (role === "COMMERCIALACCOUNT") {
        return (dispatch) => {
            dispatch(fetchDeleteProfileRequest());
            axios.delete(SERVER_URL + '/api/commercialaccounts', {
                headers: {
                    authorization: TOKEN
                }
            }).then(response => {
                dispatch(fetchDeleteProfileRequestSuccess());
                dispatch(logOut());
            }).catch(error => {
                dispatch(fetchDeleteProfileRequestFailure(error.message));
            });
        }
    }
    if (role === "REGULARACCOUNT") {
        return (dispatch) => {
            dispatch(fetchDeleteProfileRequest());
            axios.delete(SERVER_URL + '/api/regularaccounts', {
                headers: {
                    authorization: TOKEN
                }
            }).then(response => {
                dispatch(fetchDeleteProfileRequestSuccess());
                dispatch(logOut());
            }).catch(error => {
                dispatch(fetchDeleteProfileRequestFailure(error.message));
            });
        }
    }
}

export const logOut = () => {
    return (dispatch) => {
        axios.post(SERVER_URL + '/api/accounts/revoke-token', {
            headers: {
                authorization: TOKEN
            }
        }).then(response => {
            console.log('YES');
            window.localStorage.removeItem("isLogged");
            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("role");
            window.localStorage.removeItem("user_id");
            dispatch(logOutUser());
            dispatch(changeIsLogged(false));
            dispatch(setRole({type: '', id: undefined}));
        }).catch(error => {
            window.localStorage.removeItem("isLogged");
            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("role");
            window.localStorage.removeItem("user_id");
            dispatch(logOutUser());
            dispatch(changeIsLogged(false));
            dispatch(setRole({type: '', id: undefined}));
            dispatch(fetchProfileFailure("Some Error"));
        });
    }
}