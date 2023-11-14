import { verifyToken } from "../utils/auth.util.js";
import Shop from "../models/shop.model.js";
 
export const verifyTokenController = async (req, res) => {
    try {
        const publicKey = req.headers['public-key'];
        const accessToken = req.headers['access-token'];
        // const publicKey = "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqLQPKJM7h0ZVU/7d+aQj\n3SXIrj5T408hsnyav6G24J/SQixmitInAMMbGaMDNF2ETNewwULVjm0H1kWYaC7o\nbKNzuxTIKoD4K/njuMoT8wgMH2RapWwtNsfxiR6iUY6PZHI4A/HRXrAhOFAO3qiC\nSqr7BEDHMBWIGS6t0Bo4BOZWYNgzTaJUmj51Uy+jem2DoIXdU6MkSOh7sPIhh8bi\ntFzyYjHeT7ZTJ+/LlPBnlwOqu6v2+KJoFy6AP07u9AycX6+/1dD1Z1Qxh9M74dtf\nEUDFBikvXRc4psEB2GCMLjLojdheGftM0vrxZYoP+J3uy/0+zJHb5lQO1plmi1sK\n04of0L+PPNFaO4xKe3NTkaJsbjt7C6bCDSRg96xJ1nwbCCdiKvQacMvSxdIOTINP\nfKAyMRZsr30FNhiq8GvWoApNofDgJTaYYv2ZyJFJF7HsCccdpWwuz0eI3d5PMeX2\nWVbxKROS5slzVs6lKhzMxlwqLiF7QfIZGhZ3qGI+D8r6Yk+SHQ0hkm1wFyJpINxr\nAKNcDZnlgixB/jCta8TqQy0KMsXgaLGa5YSHJVgjFpOm/HDh7Zu1eDmf/WcI9V8R\nXTqNLZ7PCjz865pLp/QysNbxoCZdIpPBWP9falXNFkmhVi9aTIgEYbtOAFHJ3/jp\nx8BX8YwZk2Rr4LriNYin/T8CAwEAAQ==\n-----END PUBLIC KEY-----\n"
        // const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQxMjAxMjgxYjRjOTZiMmU3OGUxYTYiLCJpYXQiOjE2OTg3NjY4NjgsImV4cCI6MTY5ODg1MzI2OH0.HJVHEf7508XJ3Repe1iY1xbOczqx6idZRJI7u6lVkxGM3vWePl0U6NfzzELRvdF6mEh41sLmEr9rJI_d3mhN5z6fJaSlEPXAa59gqRG3HkIRzlxQ58bR5vQgVY9dwRVJ11RIJ0Ng3dStE86mscO_PFrhmUS2lY6PAmNeo68bL3BRJfN4DW7IOSPDW_rJ1EUBIZIRaXJIiTXNpDyfAm3Su2uhXzZCzkKhQsekcoWRLaYhj8GLr6HcFBV2JoXGL6u7OfVOxHUUGm064jLiqOnt0GQsoMRHRmsI_1L3HeqaLWWr4K06DmHb1E2Z4kk_IVMDwW-UWL_Hln1R0SHQvMfCFOIiP1D9gMDHn7NwtYvgujCMuGZjklOG_mtFBqXQsItMXXAaK4PJlifab_Jp4XcjYhnx4nF6Ifr3ws07G3SlgGujcu8jLYlprPiMcdfcqOunyiM-xKtaaUG0FT6bp3qXo5M6JcRPzWNKkt4vrHcbYd5eEOqxIuI52j-kJJboknQCMKIkuFzXpPEeByLsm_5Zd-bVQ17u4fr3M1G0vXhn4EFHk0CWaW-_QSFqtUF1n7Z4sQX745K5XWSVmlELr58Lf6O6Ov7nlDHnFF_Rf2Sr1-gtvRsFv-_ZXV2iwSgtjVWIt0ou8odiXclWktiXwBc5_2f6qsBOuQY401sgF-DEXRM";
        console.log(publicKey);
        console.log(accessToken);
        
        const decoded = verifyToken(accessToken, publicKey);
        if (!decoded) { 
            return res.status(400).json({
                error: 'Cannot decode token',
                message: 'error verify token in try'
            });
        }
        console.log(decoded);
        const shop = await Shop.findById(decoded.userId).lean();
        if (!shop) {
            return res.status(400).json({
                error: 'Cannot find shop',
                decoded: decoded,
                status: false
            });
        }

        return res.status(200).json({
            shop,
            message: 'success verify token',
            status: true
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: 'error verify token in catch',
        });
    }
}   