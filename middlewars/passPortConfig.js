import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/user.js';


passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado.' });
            }
            
            const isMatch = await user.verifyPassword(password); 
            if (!isMatch) {
                return done(null, false, { message: 'Contraseña incorrecta.' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialización de usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialización de usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
