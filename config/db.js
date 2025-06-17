const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, options)

    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)

    // Connection event listeners
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected")
    })

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected")
    })

    // Graceful shutdown
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close()
        console.log("🔒 MongoDB connection closed through app termination")
        process.exit(0)
      } catch (error) {
        console.error("❌ Error during graceful shutdown:", error)
        process.exit(1)
      }
    })

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("❌ Unhandled Promise Rejection:", err)
      mongoose.connection.close()
      process.exit(1)
    })
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)

    // Log additional error details in development
    if (process.env.NODE_ENV === "development") {
      console.error("Full error details:", error)
    }

    process.exit(1)
  }
}

module.exports = connectDB
