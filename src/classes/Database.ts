import mongoose from 'mongoose';

class Database {
  private connection: string = '';
  private username: string = 'chase123';
  private password: string = 'chase123';
  private collection: string = 'social-media-api';

  constructor(username?: string, password?: string, collection?: string) {
    if (Array.prototype.slice.call(arguments).length) {
      this.username = username!;
      this.password = password!;
      this.collection = collection!;
    }

    this.connectionString();
    (async () => await this.start())();
  }

  private connectionString = (): void => {
    this.connection = `mongodb+srv://${this.username}:${this.username}@chaseharrison.h2q0q.mongodb.net/${this.collection}?retryWrites=true&w=majority`;
  };

  // Initializes the connection with the database
  public start = async (): Promise<void> => {
    try {
      await mongoose.connect(this.connection);
      return console.log('Database connection successful!');
    } catch (err) {
      return console.error(`ERROR: ${err}`);
    }
  };
}

export { Database };
